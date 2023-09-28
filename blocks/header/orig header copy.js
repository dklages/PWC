import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import { createTag } from '../block-helpers.js';

// media query match that indicates mobile/tablet width
const MQ = window.matchMedia('(min-width: 900px)');
const SEARCH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false">
<path d="M14 2A8 8 0 0 0 7.4 14.5L2.4 19.4a1.5 1.5 0 0 0 2.1 2.1L9.5 16.6A8 8 0 1 0 14 2Zm0 14.1A6.1 6.1 0 1 1 20.1 10 6.1 6.1 0 0 1 14 16.1Z"></path>
</svg>`;

//var onSearchInput;
function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && MQ.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!MQ.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
//  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
//    section.setAttribute('aria-expanded', expanded);
//  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
//  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
//  const button = nav.querySelector('.nav-hamburger button');
//  document.body.style.overflowY = (expanded || MQ.matches) ? '' : 'hidden';
//  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
//  toggleAllNavSections(navSections, expanded || MQ.matches ? 'false' : 'true');
//  if(button){
//	  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
//  }
//  // enable nav dropdown keyboard accessibility
//  const navDrops = navSections.querySelectorAll('.nav-drop');
//  if (MQ.matches) {
//    navDrops.forEach((drop) => {
//      if (!drop.hasAttribute('tabindex')) {
//        drop.setAttribute('role', 'button');
//        drop.setAttribute('tabindex', 0);
//        drop.addEventListener('focus', focusNavSection);
//      }
//    });
//  } else {
//    navDrops.forEach((drop) => {
//      drop.removeAttribute('role');
//      drop.removeAttribute('tabindex');
//      drop.removeEventListener('focus', focusNavSection);
//    });
//  }
//  // enable menu collapse on escape keypress
//  if (!expanded || MQ.matches) {
//    // collapse menu on escape press
//    window.addEventListener('keydown', closeOnEscape);
//  } else {
//    window.removeEventListener('keydown', closeOnEscape);
//  }
}


  function decorateSearch(nav) {
	  
//    const searchBlock = nav.querySelector('.search');
	   const searchBlock = nav.querySelector('.nav-tools');
	  
	  console.log("Dave - in decorateSearch - searchBlock = "+searchBlock);
    if (searchBlock) {
      const label = searchBlock.querySelector('p').textContent;
      const advancedLink = searchBlock.querySelector('a');
      const searchEl = createTag('div', { class: 'gnav-search' });
      const searchBar = decorateSearchBar(label, advancedLink);
      const searchButton = createTag(
        'button',
        {
          class: 'gnav-search-button',
          'aria-label': label,
          'aria-expanded': false,
          'aria-controls': 'gnav-search-bar',
        },
        SEARCH_ICON,
      );
      searchButton.addEventListener('click', () => {
        loadSearch(searchEl);
        toggleMenu(searchEl);
      });
      searchEl.append(searchButton, searchBar);
      return searchEl;
    }
    return null;
  }

  function decorateSearchBar(label, advancedLink) {
    const searchBar = createTag('aside', { id: 'gnav-search-bar', class: 'gnav-search-bar' });
    const searchField = createTag('div', { class: 'gnav-search-field' }, SEARCH_ICON);

    const searchInput = createTag('input', { class: 'gnav-search-input', placeholder: label });
    const searchResults = createTag('div', { class: 'gnav-search-results' });

    searchInput.addEventListener('input', (e) => {
      onSearchInput(e.target.value, searchResults, advancedLink);
    });

    searchField.append(searchInput, advancedLink);
    searchBar.append(searchField, searchResults);
    return searchBar;
  }

  async function loadSearch() {
	console.log("Dave in loadSearch - onSearchInput = "+onSearchInput) ;
    if (onSearchInput) return;
	console.log("Dave in loadSearch past return block") ;  
    const gnavSearch = import('../gnav/gnav-search.js');
	  	console.log("Dave in loadSearch gnavSearch = "+gnavSearch) ;  
    onSearchInput = gnavSearch.default;
  }


/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = config.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['brand', 'sections', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const navSections = nav.querySelector('.nav-sections');
    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
        navSection.addEventListener('click', () => {
          if (MQ.matches) {
            const expanded = navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          }
        });
      });
    }
	  
	const search = decorateSearch(nav);
    if (search) {
      nav.append(search);
    }
  

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
    hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, MQ.matches);
    MQ.addEventListener('change', () => toggleMenu(nav, navSections, MQ.matches));

    decorateIcons(nav);
    block.append(nav);
  }
}
