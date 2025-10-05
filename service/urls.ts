export default {
	// banners
	getBanners() {
		return `/data/banners`;
	},
	// services
	getServices() {
		return `/data/services`;
	},
	// services category
	getCategoryService() {
		return `/data/category-services`;
	},
	// our team
	getOurTeam() {
		return `/data/our-team`;
	},
	// our team
	getMetaData() {
		return `/data/meta-data`;
	},
	// our team
	getPortfolio() {
		return `/data/our-portfolio`;
	},
	// our team
	getSettings() {
		return `/data/setting`;
	},
	// awwards
	getAwwards() {
		return `/data/our-award`;
	},
	// about
	getAbout() {
		return `/data/about`;
	},

	// contact public
	sendContact() {
		return `/data/contact-us`;
	},

	// contact public
	getContactInfo() {
		return `/data/contact-us`;
	},
	// news
	getNews(search?: string) {
		return `/news/all${search ? `?searchKey=${search}` : ""}`;
	},
	// news detail
	getNewsDetail(id: string) {
		return `/news/detail?id=${id}`;
	},
	// Latest news
	getLatestNews() {
		return `/news/latest-news`;
	},
};
