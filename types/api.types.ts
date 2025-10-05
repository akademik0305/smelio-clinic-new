export type ApiResponse<Data> = {
	data: Data;
	status: number;
	message: string;
	success: boolean;
};

export type TMeta = {
	totalCount: number;
	pageCount: number;
	currentPage: number;
	perPage: number;
};

export type TEmployee = {
	id: number;
	full_name: string;
	position: string;
	content: string;
	imageUrl: string;
};

export type TEmployees = {
	data: TEmployee[];
};

// awwards
export type TAwward = {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
};

export type TAwwards = {
	data: TAwward[];
};

// portfolios
export type TPortfolio = {
	id: number;
	imageUrl: string;
};

export type TPortfolios = {
	data: TPortfolio[];
};

// services
export type TService = {
	id: number;
	name: string;
	duration: string;
	content: string;
	price: number;
	priceFormat: string;
	imageUrl: string;
	category_id: number;
	categoryName: string;
};

export type TServices = {
	data: TService[];
};

// about
export type TAbout = {
	data: {
		content: string;
		id: number;
	};
};

// settings

export type TSettings = {
	status: number;
	message: string;
	data: {
		id: number;
		address: string;
		description: string;
		map: string;
		email: string;
		phone: string;
		facebook: string;
		instagram: string;
		telegram: string;
		youtube: string;
		imageUrl: null;
	};
};
