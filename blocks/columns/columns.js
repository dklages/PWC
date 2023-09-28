export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
	console.log("Dave in cols");
	for(let i=0;i<cols.length;i++){
		if(cols[i].querySelector('a')){
		 const link = cols[i].querySelector('a').href;
		 const picture = cols[i].querySelector('picture');
		 const html = '<a href="'+link+'">' + picture.innerHTML +'</a>';
		 picture.innerHTML=html;

		}
		cols[i].classList.add('column');
	}
	
//    [...cols.children].forEach((div) => {
//		console.log("Dave - div = "+div);
//	 const a = div.querySelector('a');
//	cols.innerHTML+=a; 	
//	});
  block.classList.add(`columns-${cols.length}-cols`);
}
