// Datos del negocio. Fuente: "Investigación Regios Restaurant Matamoros" (oct 2026).
// Todo lo marcado como `confirmed: false` debe validarse con la gerencia antes de publicar.

export type Hours = {
	/** Lunes a sábado, formato 24 h "HH:MM". */
	monSat: [string, string];
	/** Domingo, formato 24 h "HH:MM". */
	sun: [string, string];
};

export type Branch = {
	id: string;
	name: string;
	area: string;
	street: string;
	neighborhood: string;
	postalCode: string;
	phones: string[];
	hours: Hours | null;
	/** `false` cuando el horario se infirió de la sucursal Diagonal. */
	hoursConfirmed: boolean;
	blurb: string;
};

const STANDARD_HOURS: Hours = { monSat: ['07:00', '19:00'], sun: ['07:00', '13:30'] };

export const site = {
	name: "Cafetería Regio's",
	shortName: "Regio's",
	since: 1992,
	slogan: '¡Donde el aroma y el sabor son un privilegio!',
	city: 'Heroica Matamoros',
	state: 'Tamaulipas',
	timeZone: 'America/Matamoros',
	priceRange: '$$',
	facebook: 'https://www.facebook.com/100063611539730',
	delivery: [
		{ name: 'Rappi', url: 'https://www.rappi.com.mx/restaurantes/1923734531-cafeteria-regios-diagonal' },
		{
			name: 'DiDi Food',
			url: 'https://web.didiglobal.com/mx/food/matamoros-tam/cafeteria-regios/5764607572821410478/',
		},
	],
	stats: {
		checkins: '16,000',
		followers: '5,500',
		didiRating: '4.2',
	},
	amenities: [
		{ icon: 'utensils', label: 'Consumo en el lugar' },
		{ icon: 'bag', label: 'Para llevar' },
		{ icon: 'bike', label: 'A domicilio' },
		{ icon: 'parking', label: 'Estacionamiento gratis' },
		{ icon: 'accessibility', label: 'Acceso para silla de ruedas' },
		{ icon: 'card', label: 'Tarjeta y pago sin contacto' },
	],
} as const;

export const branches: Branch[] = [
	{
		id: 'diagonal',
		name: 'Diagonal',
		area: 'Centro',
		street: 'Diag. Cuauhtémoc 190',
		neighborhood: 'Col. San Francisco',
		postalCode: '87350',
		phones: ['868 813 1316', '868 813 4719'],
		hours: STANDARD_HOURS,
		hoursConfirmed: true,
		blurb: 'En el corazón de la ciudad, a unos pasos del centro histórico. El clásico para el almuerzo de diario.',
	},
	{
		id: 'canales',
		name: 'Canales',
		area: 'Lucero',
		street: 'Av. Canales 18',
		neighborhood: 'Col. Lucero',
		postalCode: '87350',
		phones: ['868 812 6411', '868 812 4811'],
		hours: STANDARD_HOURS,
		hoursConfirmed: false,
		blurb: 'A media cuadra de la Central de Camiones. Ideal si vas de paso o acabas de llegar de viaje.',
	},
	{
		id: 'pedro-cardenas',
		name: 'Pedro Cárdenas',
		area: 'Victoria',
		street: 'Av. Pedro Cárdenas y Texcoco 10-A',
		neighborhood: 'Fracc. Victoria',
		postalCode: '87398',
		phones: ['868 824 0947'],
		hours: STANDARD_HOURS,
		hoursConfirmed: false,
		blurb: 'Frente al Centro de Convenciones Mundo Nuevo y a 5 minutos a pie del Holiday Inn Matamoros.',
	},
	{
		id: 'jr',
		name: "Regio's Jr.",
		area: 'Las Palmas',
		street: 'Av. Lauro Villar',
		neighborhood: 'Col. Las Palmas',
		postalCode: '87420',
		phones: ['868 811 7176'],
		hours: null,
		hoursConfirmed: false,
		blurb: 'Nuestra versión compacta sobre Av. Lauro Villar. Llámanos para confirmar horario.',
	},
];

export const mainBranch = branches[0];

export function telHref(phone: string) {
	return `tel:+52${phone.replace(/\D/g, '')}`;
}

export function formatPhone(phone: string) {
	const d = phone.replace(/\D/g, '');
	return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
}

export function fullAddress(b: Branch) {
	return `${b.street}, ${b.neighborhood}, ${b.postalCode} ${site.city}, ${site.state}`;
}

export function mapsHref(b: Branch) {
	const query = `Cafetería Regio's ${fullAddress(b)}`;
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** "07:00" → "7:00 AM" */
export function formatTime(t: string) {
	const [h, m] = t.split(':').map(Number);
	const suffix = h < 12 ? 'AM' : 'PM';
	const h12 = h % 12 === 0 ? 12 : h % 12;
	return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}
