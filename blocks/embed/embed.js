/*
 * Embed Block
 * Show videos and social posts directly on your page
 * https://www.hlx.live/developer/block-collection/embed
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

const authWF = (url, autoplay) => {
	
	 const embedHTML = `<div class="nodisplay" style="display:none">
      <iframe src="https://west08072302.testdrive.workfront.com/loginFromUrl?username=joan%40west08072302.workfront&password=Pa55word"  style="height:100%;width:100%;min-height:600px">
      </iframe>
      </div>`;
	
	return embedHTML;
	
	
//	console.log("Dave - in authWF - about to POST");
//	//create XMLHttpRequest object
//	const xhr = new XMLHttpRequest();
//	//open a get request with the remote server URL
//	
////	xhr.open("POST", "//west08072302.testdrive.workfront.com/attask/api/v15.0/login?username=api.admin@west08072302.workfront&password=Pa55word");
//
////	xhr.open("GET", "//west08072302.testdrive.workfront.com/integrations/oauth2/authorize?client_id=bcf00d5992d1b7a82f5dc397ff7a910c&redirect_uri=https://main--franklin-site--dklages.hlx.live&response_type=code");
//		xhr.open("GET", "https://west08072302.testdrive.workfront.com/loginFromUrl?username=joan%40west08072302.workfront&password=Pa55word");
//
////https://<URL of your organization's domain>/integrations/oauth2/authorize?client_id=<Your ClientID>&redirect_uri=<Your redirect URL>&response_type=code
//
//
//	xhr.setRequestHeader('Access-Control-Allow-Origin','*');
//	xhr.setRequestHeader('Content-Type','application/json');
//	//xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
//	//xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); 
//	//xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://main--franklin-site--dklages.hlx.live');
//	//xhr.setRequestHeader('Accept','application/vnd.api+json');
//
//	//xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
//
//	console.log("Dave - trying to generate an API key");
//	
//	//send the Http request
//
//	xhr.send();
//	
//	xhr.onload = function() {
//		console.log("Dave - in authWF onload - status: "+xhr.status);
//	  if (xhr.status === 200) {
//		//parse JSON datax`x
//		const data = xhr.responseText;
//		console.log("Dave - "+data);
//
//	  } else if (xhr.status === 404) {
//		console.log("Dave - No records found")
//	  }
//	}
//
//	//triggered when a network-level error occurs with the request
//	xhr.onerror = function() {
//	  console.log("Dave - Network error occurred.  Response: "+xhr.responseText);
//	}

	 
}


const authALM = (appId, appSecret) => {
	console.log("Dave - in authALM - about to POST");
	//create XMLHttpRequest object
	const xhr = new XMLHttpRequest();
	//open a get request with the remote server URL
	
	
	//xhr.open("GET", "https://learningmanager.adobe.com/primeapi/v2/users/sandboxforey23@gmail.com/accounts");

		xhr.open("GET", "https://learningmanager.adobe.com/oauth/o/authorize?client_id="+appId+"&redirect_uri=https://main--franklin-site--dklages.hlx.live&state=state&scope=learner:read,learner:write&response_type=CODE");

//	xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers');
//	xhr.setRequestHeader('Access-Control-Allow-Methods', '*'); 
	//xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://main--franklin-site--dklages.hlx.live');
	xhr.setRequestHeader('Accept','application/vnd.api+json');

//	xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');

	
	
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


const embedWF = (url, autoplay, fullscreen) => {
	 
	  const height = fullscreen ? "1300px" : "600px";
	  const embedHTML = `<div>
      <iframe src="${url}" scrolling="no" style="height:100%;width:100%;min-height:${height}">
      </iframe>
      </div>`;
	
	return embedHTML;
};


const embedALM = (url, autoplay) => {


//    const application_id = '16fde705-eb69-4fef-8b56-94925c53b1b9';
//	const application_secret = '1b903e4a-44aa-4b5f-b48d-b5ea01b58f61';
//	const oauth_token = '43d7a6193b4439c9e614f9cc2eccefb4';
//	const refresh_token = 'ded69467edb4c917e1a9c3bb90cdf63c';
	const access_token = '971ac5bece0128b11358430ee395478e';

  const suffix = '&access_token='+access_token;

  const embed = url + suffix;

  const embedHTML = `<div>
      <iframe src="${embed}" style="height:100%;width:100%;min-height:600px">
      </iframe>
    </div>`;
//	  const embedHTML = `<div style="left: 0; width: 100%; min-height: 600px; position: relative;">
//      <iframe src="https://west08072302.testdrive.workfront.com/dashboard/32faaebb0e1a43cf9617ddb3668486c3/detail style="height:100%;width:100%;min-height:600px"
//      </iframe>
//    </div>`;


	return embedHTML;
};



const getDefaultEmbed = (url) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
      scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
  </div>`;

const embedYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = encodeURIComponent(usp.get('v'));
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  const embedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
  return embedHTML;
};

const embedVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/');
  const suffix = autoplay ? '?muted=1&autoplay=1' : '';
  const embedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://player.vimeo.com/video/${video}${suffix}" 
      style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
      frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen  
      title="Content from Vimeo" loading="lazy"></iframe>
    </div>`;
  return embedHTML;
};

const embedTwitter = (url) => {
  const embedHTML = `<blockquote class="twitter-tweet"><a href="${url.href}"></a></blockquote>`;
  loadScript('https://platform.twitter.com/widgets.js');
  return embedHTML;
};

const loadEmbed = (block, link, autoplay,fullscreen) => {

  if (block.classList.contains('embed-is-loaded')) {
//	  console.log("Dave returning out of loadEmbed");
    return;
  }

	

	

  const EMBEDS_CONFIG = [
	{
      match: ['learningmanager'],
      embed: embedALM,
    },
	{
      match: ['workfront'],
      embed: embedWF,
    },
	{
      match: ['authWF'],
      embed: authWF,
    },
    {
      match: ['youtube', 'youtu.be'],
      embed: embedYoutube,
    },
    {
      match: ['vimeo'],
      embed: embedVimeo,
    },
    {
      match: ['twitter'],
      embed: embedTwitter,
    },
  ];
	
  block.classList = 'block embed';
  //See if there are multiple URLs
  const urls = link.split(',');	

  var myHTML = '<div><ul>';	
  for (let i = 0; i < urls.length; i++) {
		
//	  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.includes(match)));
	  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => urls[i].includes(match)));
//	  const url = new URL(link);
	  const url = urls[i].includes('authWF') ? urls[i] : new URL(urls[i]);

	  if (config) {

		  myHTML += '<li class=embed-'+config.match[0]+'>'+config.embed(url, autoplay,fullscreen)+'</li>';

		  
//		block.classList.add(`embed-${config.match[0]}`);
	  } else {
		myHTML += '<li>'+getDefaultEmbed(url)+'</li>';
	  }
  }
	
  myHTML += '</ul></div>';	

  block.innerHTML = myHTML;
  block.classList.add('embed-is-loaded');
  
};

export default function decorate(block) {
//  console.log("Dave in embed.js");
  const placeholder = block.querySelector('picture') ? block.querySelector('picture') : '';
  const link = block.querySelector('a') ? block.querySelector('a').href : block.textContent;
  block.textContent = '';
	
	
  //Check for fullscreen attribute
  var fullscreen = block.parentNode.parentNode.classList.contains("embed-fullscreen");
  console.log("Dave - fullscreen = "+fullscreen);
	
	
  if (placeholder) {
	 // console.log("Dave - placeholder found");
	  loadEmbed(block, link, true);
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-placeholder';
    wrapper.innerHTML = '<div class="embed-placeholder-play"><button title="Play"></button></div>';
    wrapper.prepend(placeholder);
    wrapper.addEventListener('click', () => {
      loadEmbed(block, link, true,fullscreen);
    });
    block.append(wrapper);
  } else {
	//  console.log("Dave - no placeholder found");
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
//		  console.log("Dave - about to loadEmbed");
        loadEmbed(block, link,false,fullscreen);
      }
    });
    observer.observe(block);
  }
}
