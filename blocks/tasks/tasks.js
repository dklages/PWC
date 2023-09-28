import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
	console.log("Dave - decorating tasks");
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
//    li.innerHTML = row.innerHTML;
    [...row.children].forEach((div) => {
		console.log("Dave - div = "+div);
	 const a = div.querySelector('a');
	 const picture = div.querySelector('picture');
     const text = div.querySelector('h5');
	 li.innerHTML += '<a href = '+a.href+'>'+text+picture+'</a>';	
//
//		if(div.querySelector('a')){
//		  console.log("Dave - link found");
//		  li.innerHTML += '<a href = '+div.querySelector('a').href+'>';
//		  console.log("Dave - innerHTML = "+li.innerHTML);
//	  }
      if (div.children.length === 1 && div.querySelector('picture')){
		   div.className = 'tasks-card-image';
	  }
      else {
		  div.className = 'tasks-card-body';
	  }
	  li.innerHTML+='</a>';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
