Vue.component('single-post', {
	props: [ 'results' ],
	template: `
	<div class="container">
			<div class="card" v-for="posts in getPosts">
					<div class="card-title">
						{{ posts.title }}
					</div>
					<div class="card-image">
						<a :href="posts.url"><img :src="posts.image_url" alt=""></a>
					</div>
					<div class="card-abstract">
						{{ posts.abstract | snippet }}
					</div>
			</div>
		</div>
	`,
	computed:{
		getPosts(section){
			let posts = this.results;
			return posts.map((post)=>{
					let imgObj = post.multimedia.find((media)=>{return media.format==='superJumbo'});
					post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
					return post;
				}
			);
		}
	}
});

Vue.filter('snippet',function(value){
	return value.slice(0,150)+'...';
})

function buildUrl(section){
	return 'https://api.nytimes.com/svc/topstories/v2/'+ section +'.json?api-key=cdfc78be5e0647e295ba0ed1bda95ad6';
}

const SECTIONS = "home,arts,automobiles,books,business,fashion,food,health,insider,magazine,movies,national,nyregion,obituaries,opinion,politics,realestate,science,sports,sundayreview,technology,theater,tmagazine,travel,upshot,world";

const vm = new Vue({
	el: '#app',
	data:{
		results: [],
		sections: SECTIONS.split(','),
		section: 'home'
	},
	mounted(){
		this.getPosts('home');
	},
	methods:{
		getPosts(section){
			let url = buildUrl(section);
			axios.get(url)
			.then((res)=>{
				this.results = res.data.results;
			})
		}
	},
	computed:{
		omitAbstract(){
			this.results
		}
	}
});