// Keep link to current page highlighted
document.getElementById('menu-links').addEventListener('click', function(e) {
	menuItem = document.getElementById('menu-links').getElementsByTagName('a');
	for(i = 0; i < menuItem.length; i++) {
		if(e.target == menuItem[i]) {
			menuItem[i].className='menu-item current';
		} else {
			menuItem[i].className='menu-item';
		}
	}
});

// Load topics for home page on load
window.addEventListener('load', function(e) {
	topics = document.getElementsByClassName('topic');
	var topicDates = new Array();
	currentDate = new Date();
	startDate = new Date();
	endDate = new Date();
	startDate.setDate(currentDate.getDate() - 7);
	endDate.setDate(currentDate.getDate() + 7);
	for(i = 0; i < topics.length; i++) {
		topicDates[i] = topics[i].getElementsByClassName('date');
		if(startDate < Date.parse(topicDates[i][0].textContent) && Date.parse(topicDates[i][0].textContent) <= endDate) {
			topics[i].className='topic';
			topics[i].getElementsByClassName('title')[0].className='title expand';
			topics[i].getElementsByClassName('summary')[0].className='summary';
			topics[i].getElementsByClassName('nav')[0].className='nav';
		}
	}
});

// Load topics for current page on click
document.getElementById('menu-links').addEventListener('click', function(e) {
	topics = document.getElementsByClassName('topic');
	var topicDates = new Array();
	currentDate = new Date();
	startDate = new Date();
	endDate = new Date();
	startDate.setDate(currentDate.getDate() - 7);
	endDate.setDate(currentDate.getDate() + 7);
	for(i = 0; i < topics.length; i++) {
		topicDates[i] = topics[i].getElementsByClassName('date');
		if(e.target.textContent == 'Home') {
			if(startDate < Date.parse(topicDates[i][0].textContent) && Date.parse(topicDates[i][0].textContent) <= endDate) {
				topics[i].className='topic';
				topics[i].getElementsByClassName('title')[0].className='title expand';
				topics[i].getElementsByClassName('summary')[0].className='summary';
				topics[i].getElementsByClassName('nav')[0].className='nav';
			} else {
				topics[i].className='topic hidden';
				topics[i].getElementsByClassName('title')[0].className='title';
				topics[i].getElementsByClassName('summary')[0].className='summary hidden';
				topics[i].getElementsByClassName('nav')[0].className='nav hidden';
			}
		}
		if(e.target.textContent == 'Archive') {
			if(Date.parse(topicDates[i][0].textContent) < startDate) {
				topics[i].className='topic';
			} else {
				topics[i].className='topic hidden';
				topics[i].getElementsByClassName('title')[0].className='title';
				topics[i].getElementsByClassName('summary')[0].className='summary hidden';
				topics[i].getElementsByClassName('nav')[0].className='nav hidden';
			}
		}
	}
});

// Show topic summary on click
document.getElementById('page').addEventListener('click', function(e) {
	topics = document.getElementsByClassName('topic');
	var title = new Array();
	for(i = 0; i < topics.length; i++) {
		title[i] = topics[i].getElementsByClassName('title');
	}
	for(i = 0; i < topics.length; i++) {
		if(e.target == title[i][0] && title[i][0].className != 'title expand') {
			title[i][0].className='title expand';
			topics[i].getElementsByClassName('summary')[0].className='summary';
			topics[i].getElementsByClassName('nav')[0].className='nav';
			for(j = 0; j < topics.length; j++) {
				if(i != j) {
					try {
						title[j][0].className='title';
						topics[j].getElementsByClassName('summary')[0].className='summary hidden';
						topics[j].getElementsByClassName('nav')[0].className='nav hidden';
						topics[j].getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
						topics[j].getElementsByClassName('readings')[0].className='readings hidden';
					} catch(err) {
					}
				}
			}
		} else if(e.target == title[i][0] && title[i][0].className == 'title expand') {
			try {
				title[i][0].className='title';
				topics[i].getElementsByClassName('summary')[0].className='summary hidden';
				topics[i].getElementsByClassName('nav')[0].className='nav hidden';
				topics[i].getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
				topics[i].getElementsByClassName('readings')[0].className='readings hidden';
			} catch(err) {
			}
		}
	}
});

// Show readings list on click
document.getElementById('page').addEventListener('click', function(e) {
	topics = document.getElementsByClassName('topic');
	var readingsButton = new Array();
	for(i = 0; i < topics.length; i++) {
		readingsButton[i] = topics[i].getElementsByClassName('readingsbutton');
	}
	for(i = 0; i < topics.length; i++) {
		if(e.target == readingsButton[i][0] && readingsButton[i][0].className != 'button readingsbutton expand') {
			readingsButton[i][0].className='button readingsbutton expand';
			topics[i].getElementsByClassName('readings')[0].className='readings';
		} else if(e.target == readingsButton[i][0] && readingsButton[i][0].className == 'button readingsbutton expand') {
				readingsButton[i][0].className='button readingsbutton';
				topics[i].getElementsByClassName('readings')[0].className='readings hidden';
		}
	}
});
