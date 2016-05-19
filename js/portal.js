// Test for current page
function isHomeOrArchive() {
	menuItem = document.getElementById('menu-links').getElementsByTagName('a');
	for(z = 0; z < menuItem.length; z++) {
		if(menuItem[z].className == 'menu-item current') {
			return menuItem[z].textContent;
		}
	}
}	
// Test for topic currency
function isCurrentOrArchived(topic) {
	currentDate = new Date();
	startDate = new Date();
	endDate = new Date();
	startDate.setDate(currentDate.getDate() - 7);
	endDate.setDate(currentDate.getDate() + 7);
	if(startDate < Date.parse(topic.getElementsByClassName('date')[0].textContent) && Date.parse(topic.getElementsByClassName('date')[0].textContent) <= endDate) {
		return 'current';
	} else if(Date.parse(topic.getElementsByClassName('date')[0].textContent) < startDate) {
		return 'archived';
	}
}

// How to expand topic content
function openTopic(topic) {
	topic.getElementsByClassName('title')[0].className='title expand';
	topic.getElementsByClassName('summary')[0].className='summary';
	topic.getElementsByClassName('nav')[0].className='nav';
}

// How to hide topic content (including readings)
function closeTopic(topic) {
	try {
		topic.getElementsByClassName('title')[0].className='title';
		topic.getElementsByClassName('summary')[0].className='summary hidden';
		topic.getElementsByClassName('nav')[0].className='nav hidden';
		topic.getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
		topic.getElementsByClassName('readings')[0].className='readings hidden';
	} catch(err) {
		// Catch TypeError when
		// (1) topics has no readings button and
		// (2) looping to close topic (confusing...).
	}
}

// Display topics for home page on load
window.addEventListener('load', function(e) {
	topics = document.getElementsByClassName('topic');
	for(i = 0; i < topics.length; i++) {
		if(isCurrentOrArchived(topics[i]) == 'current') {
			topics[i].getElementsByClassName('date')[0].className='topic';
			openTopic(topics[i]);
		}
	}
});

// Toggle topics and current page link on click
document.getElementById('menu-links').addEventListener('click', function(e) {
	// Keep link to current page highlighted
	menuItem = document.getElementById('menu-links').getElementsByTagName('a');
	for(i = 0; i < menuItem.length; i++) {
		if(e.target == menuItem[i]) {
			menuItem[i].className='menu-item current';
		} else {
			menuItem[i].className='menu-item';
		}
	}
	// Load topics for current page
	topics = document.getElementsByClassName('topic');
	for(i = 0; i < topics.length; i++) {
		if(isHomeOrArchive() == 'Home' && isCurrentOrArchived(topics[i]) == 'current') {
			topics[i].className='topic';
			openTopic(topics[i]);
		} else if(isHomeOrArchive() == 'Archive' && isCurrentOrArchived(topics[i]) == 'archived') {
			topics[i].className='topic';
		} else {
			topics[i].className='topic hidden';
			closeTopic(topics[i]);
		}
	}
});

// Show topic summary or readings list on click
document.getElementById('page').addEventListener('click', function(e) {
	topics = document.getElementsByClassName('topic');
	// Show topic summary
	for(i = 0; i < topics.length; i++) {
		if(e.target == topics[i].getElementsByClassName('title')[0] && topics[i].getElementsByClassName('title')[0].className != 'title expand') {
			openTopic(topics[i]);
			if(isHomeOrArchive() == 'Archive') {
				for(j = 0; j < topics.length; j++) {
					if(i != j) {
						closeTopic(topics[j]);
					}
				}
			}
		} else if(e.target == topics[i].getElementsByClassName('title')[0] && topics[i].getElementsByClassName('title')[0].className == 'title expand') {
			closeTopic(topics[i]);
		}
	}
	// Show readings list on click
	for(i = 0; i < topics.length; i++) {
		if(e.target == topics[i].getElementsByClassName('readingsbutton')[0] && topics[i].getElementsByClassName('readingsbutton')[0].className != 'button readingsbutton expand') {
			topics[i].getElementsByClassName('readingsbutton')[0].className='button readingsbutton expand';
			topics[i].getElementsByClassName('readings')[0].className='readings';
		} else if(e.target == topics[i].getElementsByClassName('readingsbutton')[0] && topics[i].getElementsByClassName('readingsbutton')[0].className == 'button readingsbutton expand') {
			topics[i].getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
			topics[i].getElementsByClassName('readings')[0].className='readings hidden';
		}
	}
});
