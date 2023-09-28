/*
 * ALM Block
 * Show videos and social posts directly on your page
 * https://www.hlx.live/developer/block-collection/alm
 */

const loadScript = (url, callback, type) => {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  if (type) {
    script.setAttribute('type', type);
  }
  script.onload = callback;
  head.append(script);
  return script;
};


const authALM = (appId, appSecret) => {
	console.log("Dave - in authALM - about to POST");
	//create XMLHttpRequest object
	const xhr = new XMLHttpRequest();
	//open a get request with the remote server URL
	
	//xhr.open("GET", "https://learningmanager.adobe.com/primeapi/v2/users/sandboxforey23@gmail.com/accounts");

		xhr.open("GET", "https://learningmanager.adobe.com/oauth/o/authorize?client_id="+appId+"&redirect_uri=https://main--franklin-site--dklages.hlx.live&state=state&scope=learner:read,learner:write&response_type=CODE");

	xhr.setRequestHeader('Accept','application/vnd.api+json');
	
	//send the Http request

	xhr.send();
	
	xhr.onload = function() {
		console.log("Dave - in onload - status: "+xhr.status);
	  if (xhr.status === 200) {
		//parse JSON datax`x
		const data = xhr.responseText;
		console.log("Dave - "+data);

	  } else if (xhr.status === 404) {
		console.log("Dave - No records found")
	  }
	}

	//triggered when a network-level error occurs with the request
	xhr.onerror = function() {
	  console.log("Dave - Network error occurred.  Response: "+xhr.responseText);
	}
	 
}

const getEnrollments = (block, access_token) => {
	console.log("Dave - in getEnrollemtns - about to GET");
	//create XMLHttpRequest object
	const xhr = new XMLHttpRequest();
	//open a get request with the remote server URL
	
	
	
	xhr.open("GET", "https://captivateprime.adobe.com/primeapi/v2/enrollments?page[limit]=10&filter.loTypes=course&sort=dateEnrolled&access_token="+access_token);
	
	xhr.setRequestHeader('Accept','application/vnd.api+json');
	
	//send the Http request

	xhr.send();
	
	
	
	xhr.onload = function() {
		console.log("Dave - in enrollments onload - status: "+xhr.status);
	  if (xhr.status === 200) {
		//parse JSON datax`x
		const json = JSON.parse(xhr.response);
		console.log("Dave - response text = "+xhr.responseText);
		block.innerHTML = '<div class="alm block"><ul></ul></div>';
		for (let i = 0; i < json.data.length; i++) {
			const courseId = json.data[i].relationships.learningObject.data.id;
			console.log("Dave - course = "+courseId);
		  	getCourseInfo(block, access_token,courseId);
		}  

	  } else if (xhr.status === 404) {
		console.log("Dave - No records found")
	  }
	}

	//triggered when a network-level error occurs with the request
	xhr.onerror = function() {
	  console.log("Dave - Network error occurred.  Response: "+xhr.responseText);
	}
	 
}

const getCourseInfo = (block, access_token,courseId) => {
	console.log("Dave - in getCourseInfo - about to GET - courseId="+courseId);
	//create XMLHttpRequest object
	const xhr = new XMLHttpRequest();
	//open a get request with the remote server URL
	
	xhr.open("GET", "https://captivateprime.adobe.com/primeapi/v2/learningObjects/"+courseId+"?access_token="+access_token);
	xhr.setRequestHeader('Accept','application/vnd.api+json');
	
	//send the Http request

	xhr.send();
	
	xhr.onload = function() {
		console.log("Dave - in getCourseId onload - status: "+xhr.status);
	  if (xhr.status === 200) {
		//parse JSON datax`x
		const json = JSON.parse(xhr.response);
		console.log("Dave - response text = "+xhr.responseText);
		const courseTitle = json.data.attributes.localizedMetadata[0].name;
		const courseImage = json.data.attributes.imageUrl;  
		const courseLink =  json.links.self;
		console.log("Dave courseTitle = "+courseTitle);
		console.log("Dave courseImage = "+courseImage);
	    console.log("Dave courseLink = "+courseLink);
		const origHTML = block.innerHTML;  
		const indexPosition = origHTML.indexOf('</ul>');
		const embedHTML = '<li><div style="left: 0; width: 100%; position: relative;">'+courseTitle+'<a href="'+courseLink+'"><img src='+courseImage+'></img></a></div></li>';
	
		const newHTML = origHTML.substring(0, indexPosition)
        + embedHTML + origHTML.substring(indexPosition);
	
		 block.innerHTML=newHTML;

		return newHTML;  

	  } else if (xhr.status === 404) {
		console.log("Dave - No records found")
	  }
	}

	//triggered when a network-level error occurs with the request
	xhr.onerror = function() {
	  console.log("Dave - Network error occurred.  Response: "+xhr.responseText);
	}
	 
}



const embedALM = (url, autoplay) => {
	console.log("Dave in embedALM - url = "+url);
//    const application_id = '16fde705-eb69-4fef-8b56-94925c53b1b9';
//	const application_secret = '1b903e4a-44aa-4b5f-b48d-b5ea01b58f61';
//	const oauth_token = '0df53e1686f5201de70c58a562846532';
//	const refresh_token = 'e65f068d186882594814c0217eb4091e';
	const access_token = '971ac5bece0128b11358430ee395478e';
		
  const suffix = '&access_token='+access_token;

  const embed = url + suffix;

  const embedHTML = `<div style="left: 0; width: 100%; min-height: 600px; position: relative;">
      <iframe src="${embed}" style="height:100%;width:100%;min-height:600px"
      </iframe>
    </div>`;

	return embedHTML;
};

const getDefaultAlm = (url) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
      scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
  </div>`;



const loadAlm = (block, method) => {
	console.log("Dave - in new loadALM - method="+method);
  if (block.classList.contains('alm-is-loaded')) {
    return;
  }
	//Dave
//	const application_id = '16fde705-eb69-4fef-8b56-94925c53b1b9';
	//const application_secret = '1b903e4a-44aa-4b5f-b48d-b5ea01b58f61';
	
//	const token = authALM(application_id, application_secret);
	
	const access_token = '971ac5bece0128b11358430ee395478e';

  const ALM_CONFIG = [
	{ 
      match: ['learningmanager'],
      alm: embedALM,
    },
	{ 
      match: ['nrollments'],
      alm: getEnrollments,
    }
  ];
console.log("Dave is here!");
  const config = ALM_CONFIG.find((e) => e.match.some((match) => method.includes(match)));

	
	console.log("Dave - config.alm = "+config);
	
  if (config) {
//    block.innerHTML = config.alm(access_token);
//	console.log("Dave - block.innerHTML = "+ block.innerHTML);
//    block.classList = `block alm alm-${config.match[0]}`;
	  block.classList = `block alm alm-${config.match[0]}`;
	  config.alm(block, access_token);
	  
  } else {
    block.innerHTML = getDefaultAlm(method);
    block.classList = 'block alm';
  }
  block.classList.add('alm-is-loaded');
};

export default function decorate(block) {

  console.log("Dave in alm.js");
  const placeholder = block.querySelector('picture') ? block.querySelector('picture') : '';
  const method = block.textContent;

  block.textContent = '';

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'alm-placeholder';
    wrapper.innerHTML = '<div class="alm-placeholder-play"><button title="Play"></button></div>';
    wrapper.prepend(placeholder);
    wrapper.addEventListener('click', () => {
	loadAlm(block, method);
    });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
		loadAlm(block, method);
      }
    });
    observer.observe(block);
  }
}
