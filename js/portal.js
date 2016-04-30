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

// Load topics for current page
window.addEventListener('load', function(e) {
	topics = document.getElementsByClassName('topic');
	topicDates = document.getElementsByClassName('date');
	currentDate = new Date();
	startDate = new Date();
	endDate = new Date();
	startDate.setDate(currentDate.getDate() - 7);
	endDate.setDate(currentDate.getDate() + 7);
	for(i = 0; i < topicDates.length; i++) {
		if(startDate < Date.parse(topicDates[i].textContent) && Date.parse(topicDates[i].textContent) <= endDate) {
			topics[i].className='topic';
		}
	}
});
document.getElementById('menu-links').addEventListener('click', function(e) {
	topics = document.getElementsByClassName('topic');
	topicDates = document.getElementsByClassName('date');
	currentDate = new Date();
	startDate = new Date();
	endDate = new Date();
	startDate.setDate(currentDate.getDate() - 7);
	endDate.setDate(currentDate.getDate() + 7);
	for(i = 0; i < topicDates.length; i++) {
		if(e.target.textContent.localeCompare('Home') == 0) {
			if(startDate < Date.parse(topicDates[i].textContent) && Date.parse(topicDates[i].textContent) <= endDate) {
				topics[i].className='topic';
			} else {
				topics[i].className='topic hidden';
			}
		}
		if(e.target.textContent.localeCompare('Archive') == 0) {
			if(Date.parse(topicDates[i].textContent) < startDate) {
				topics[i].className='topic';
			} else {
				topics[i].className='topic hidden';
			}
		}
	}
});
