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
	topicDate = new Date(Date.parse(topic.getElementsByClassName('date')[0].textContent));
	currentDate = new Date();
	if(topicDate.getDay() == 1 || topicDate.getDay() == 2) {
		startDate = new Date(topicDate.valueOf() - 345600000);
	} else if(topicDate.getDay() == 3 || topicDate.getDay() == 4) {
		startDate = new Date(topicDate.valueOf() - 518400000);
	}
	endDate = new Date(topicDate.valueOf() + (7 - topicDate.getDay()) * 86400000);
	if(startDate < currentDate && currentDate <= endDate) {
		return 'current';
	} else if(currentDate > endDate) {
		return 'archived';
	}
}

// How to expand topic content
function openTopic(topic) {
	topic.getElementsByClassName('title')[0].className='title expand';
	topic.getElementsByClassName('summary')[0].style.display='';
	topic.getElementsByClassName('nav')[0].style.display='';
	try {
		if(isHomeOrArchive() == 'Home') {
			assignments = topic.getElementsByClassName('assignmentbutton');
			for(y = 0; y < assignments.length; y++) {
				assignments[y].style.display='';
			}
		} else if(isHomeOrArchive() == 'Archive') {
			solutions = topic.getElementsByClassName('solutionbutton');
			for(y = 0; y < solutions.length; y++) {
				solutions[y].style.display='';
			}
		}
	} catch(err) {
		// Catch TypeError when topic has no puzzle
	}
}

// How to hide topic content (including readings)
function closeTopic(topic) {
	topic.getElementsByClassName('title')[0].className='title';
	topic.getElementsByClassName('summary')[0].style.display='none';
	try {
		topic.getElementsByClassName('nav')[0].style.display='none';
		topic.getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
		topic.getElementsByClassName('readings')[0].style.display='none';
		assignments = topic.getElementsByClassName('assignmentbutton');
		for(y = 0; y < assignments.length; y++) {
			assignments[y].style.display='none';
		}
		solutions = topic.getElementsByClassName('solutionbutton');
		for(y = 0; y < solutions.length; y++) {
			solutions[y].style.display='none';
		}
	} catch(err) {
		// Catch TypeError when topic has no readings and/or puzzle
	}
}

// Display topics for home page on load
window.addEventListener('load', function(e) {
	modules = document.getElementsByClassName('module');
	moduleTopics = new Array();
	for(i = 0; i < modules.length; i++) {
		moduleTopics[i] = modules[i].getElementsByClassName('topic');
		for(j = 0; j < moduleTopics[i].length; j++) {
			if(isCurrentOrArchived(moduleTopics[i][j]) == 'current') {
				modules[i].style.display='';
				openTopic(moduleTopics[i][j]);
			}
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
	modules = document.getElementsByClassName('module');
	moduleTopics = new Array();
	for(i = 0; i < modules.length; i++) {
		moduleTopics[i] = modules[i].getElementsByClassName('topic');
		if(isHomeOrArchive() == 'Home' && isCurrentOrArchived(moduleTopics[i][0]) == 'current') {
			modules[i].style.display='';
			for(j = 0; j < moduleTopics[i].length; j++) openTopic(moduleTopics[i][j]);
		} else if(isHomeOrArchive() == 'Archive' && isCurrentOrArchived(moduleTopics[i][0]) == 'archived') {
				modules[i].style.display='';
		} else {
			modules[i].style.display='none';
			for(j = 0; j < moduleTopics[i].length; j++) closeTopic(moduleTopics[i][j]);
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
			topics[i].getElementsByClassName('readings')[0].style.display='';
		} else if(e.target == topics[i].getElementsByClassName('readingsbutton')[0] && topics[i].getElementsByClassName('readingsbutton')[0].className == 'button readingsbutton expand') {
			topics[i].getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
			topics[i].getElementsByClassName('readings')[0].style.display='none';
		}
	}
});
