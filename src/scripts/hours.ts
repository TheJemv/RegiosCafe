import { formatTime, site, type Hours } from '../data/site';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Día (0 = domingo) y minuto del día en la hora local de Matamoros, sin importar dónde esté el visitante. */
export function nowInMatamoros(date = new Date()) {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: site.timeZone,
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	}).formatToParts(date);
	const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
	return {
		day: WEEKDAYS.indexOf(get('weekday')),
		minutes: Number(get('hour')) * 60 + Number(get('minute')),
	};
}

const toMinutes = (t: string) => {
	const [h, m] = t.split(':').map(Number);
	return h * 60 + m;
};

const rangeFor = (hours: Hours, day: number) => (day === 0 ? hours.sun : hours.monSat);

export function getStatus(hours: Hours, now = nowInMatamoros()) {
	const [open, close] = rangeFor(hours, now.day);
	if (now.minutes >= toMinutes(open) && now.minutes < toMinutes(close)) {
		return { open: true, text: `Abierto · cierra ${formatTime(close)}` };
	}
	if (now.minutes < toMinutes(open)) {
		return { open: false, text: `Cerrado · abre hoy ${formatTime(open)}` };
	}
	const [nextOpen] = rangeFor(hours, (now.day + 1) % 7);
	return { open: false, text: `Cerrado · abre mañana ${formatTime(nextOpen)}` };
}

export function getGreeting(hours: Hours, now = nowInMatamoros()) {
	const [openAt] = rangeFor(hours, now.day);
	if (now.minutes < toMinutes(openAt)) return `Hoy te esperamos desde las ${formatTime(openAt)}.`;
	if (!getStatus(hours, now).open) return 'Por hoy ya cerramos. Mañana el café está listo desde temprano.';
	if (now.minutes < 12 * 60) return 'Buenos días: el café ya está servido y la plancha, caliente.';
	return 'Buenas tardes: todavía estás a tiempo para un guayin.';
}
