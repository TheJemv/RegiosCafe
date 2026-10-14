// Precios de mostrador sugeridos (MXN) tomados de la investigación.
// Pendiente: validar la lista de precios autorizada por la gerencia.

export type MenuItem = {
	name: string;
	description: string;
	/** `null` = precio en revisión, se muestra "Consultar". */
	price: number | null;
	tag?: string;
};

export type MenuCategory = {
	id: string;
	name: string;
	blurb: string;
	items: MenuItem[];
};

export const menu: MenuCategory[] = [
	{
		id: 'almuerzos',
		name: 'Almuerzos',
		blurb: 'El corazón de la casa: almuerzos norteños, abundantes y hechos al momento.',
		items: [
			{
				name: 'Guayin Especial',
				description:
					'Tortilla de huevo rellena de frijoles, cubierta con queso amarillo y jamón, bañada en salsa ranchera. Con salchicha, tocino crujiente y ensalada.',
				price: 225,
				tag: 'Especialidad',
			},
			{
				name: 'Guayin Sencillo',
				description:
					'Tortilla de huevo rellena de frijoles guisados, bañada en salsa ranchera, con ensalada de lechuga y jitomate.',
				price: 160,
			},
			{
				name: 'Huevos Rancheros Sincronizados',
				description:
					'Dos huevos sobre tortillas doradas, cada uno con jamón y queso amarillo, ahogados en salsa ranchera. Con frijoles.',
				price: 225,
			},
			{
				name: 'Huevos Divorciados',
				description: 'Dos huevos: uno con salsa verde y otro con salsa roja, con frijoles guisados.',
				price: 160,
			},
			{
				name: 'Huevos Estrellados con Salsa de Chorizo',
				description: 'Sobre tortilla de maíz dorada, bañados en salsa de chorizo regional. Con frijoles.',
				price: 180,
			},
			{
				name: 'Huevos con Chicharrón en Salsa Verde',
				description: 'Revueltos o estrellados, en salsa verde con chicharrón. Un clásico del norte.',
				price: null,
			},
			{
				name: 'Almuerzo Combinado',
				description: 'Dos huevos al gusto, frijoles refritos, dos guarniciones a elegir y tortillas de maíz calientes.',
				price: 225,
			},
			{
				name: 'Almuerzo Especial de Hot Cakes',
				description: 'Huevos al gusto, salchicha, jamón y papas fritas, con un par de hot cakes y tortillas de maíz.',
				price: 225,
			},
		],
	},
	{
		id: 'antojitos',
		name: 'Antojitos',
		blurb: 'Para pedir al centro de la mesa y compartir, como se acostumbra en Tamaulipas.',
		items: [
			{
				name: 'Gorditas de Manteca',
				description: 'Gordita grande de masa de maíz con la receta de la casa, rellena del guisado que elijas.',
				price: 75,
				tag: 'Receta de la casa',
			},
			{
				name: 'Entomatadas',
				description:
					'Tres tacos dorados de queso o pollo, bañados en salsa de tomate y gratinados con queso fresco. Con frijoles.',
				price: 185,
			},
			{
				name: 'Sincronizada Especial',
				description:
					'Tortillas de harina con frijoles, jamón, queso amarillo y crema, bañada en salsa ranchera y con aguacate.',
				price: 120,
			},
			{
				name: 'Sincronizada Sencilla',
				description: 'Tortillas de harina rellenas de frijoles, jamón, queso amarillo derretido y crema.',
				price: 95,
			},
			{
				name: 'Frijoles con Chorizo',
				description: 'Frijoles revueltos con chorizo de la región, servidos con totopos para botanear.',
				price: 150,
			},
			{
				name: 'Orden de Papas Fritas',
				description: 'La porción clásica, para acompañar lo que quieras.',
				price: 73,
			},
		],
	},
	{
		id: 'ligero',
		name: 'Sándwiches',
		blurb: 'Sándwiches y ensaladas: algo más ligero para la hora de la oficina.',
		items: [
			{
				name: 'Club Sándwich',
				description: 'Cuatro panes tostados con jamón, lechuga, jitomate y aguacate. Con papas fritas.',
				price: 150,
			},
			{
				name: 'Sándwich de Ensalada de Pollo',
				description: 'Ensalada de pollo con lechuga y aderezos. Con papas fritas.',
				price: 145,
			},
			{
				name: 'Sándwich de Jamón',
				description: 'Jamón y queso amarillo, con guarnición de papas fritas.',
				price: 88,
			},
			{
				name: 'Ensalada de Pollo',
				description: 'Pollo deshebrado de pierna y muslo con vegetales frescos y un toque de mayonesa.',
				price: 170,
			},
		],
	},
];

/** Categorías que existen en sucursal pero aún no tienen platillos capturados. */
export const moreCategories = [
	'Caldos',
	'Chilaquiles',
	'Tacos',
	'Hamburguesas',
	'Platos fuertes',
	'Tortillas de harina',
	'Panadería',
	'Café y bebidas',
];

export function formatPrice(price: number | null) {
	return price === null ? 'Consultar' : `$${price}`;
}
