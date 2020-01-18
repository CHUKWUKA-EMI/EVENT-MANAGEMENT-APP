 const eventType = document.getElementById('events');
 const eventName = document.getElementById('eventName');
 const eventVenue = document.getElementById('venue');
 const eventDate = document.getElementById('date');
 const eventGuests = document.getElementById('guests');
 const eventComment = document.getElementById('comment');
 const eventPhoto = document.getElementById('photo');

 
 const eventClass = document.querySelector('.div-grid');
 const ul = document.createElement('ul');

 const canvas = document.createElement('canvas');
 const ctx = canvas.getContext('2d');
 
 
 

document.addEventListener('submit', function (event) {
	console.log("I'm loaded");
	event.preventDefault()
	const formContent = document.getElementById('myForm');
	formContent.addEventListener('submit', addingEvents());
     
})


function addingEvents() {
	//event.preventDefault();
	
	 eventType.value;
	 console.log(eventType.value)
	
     eventName.value;
	
     eventVenue.value;
	
    eventDate.value;
	
     eventGuests.value;
	
     eventComment.value;
	
	eventPhoto.value;

	 let myEvent = {
		Type: eventType.value,
		Name: eventName.value,
		Venue: eventVenue.value,
		Date: eventDate.value,
		Guests: eventGuests.value,
		Comment: eventComment.value,
		Photo: eventPhoto.value
	};
	window.localStorage.setItem('myEvent', JSON.stringify(myEvent))
	
	location.reload = function(){
		window.localStorage.getItem('myEvent')
	}

 
	
	//const eventArray = Object.keys(myEvent).map(i => myEvent[i])
	
      const ulArray = Object.keys(ul);
	console.log(myEvent, 'the  event object');
	//const eventClass  = document.querySelector('.div-grid');
	
	//const ul = document.createElement('ul');
	eventClass.appendChild(ul);
     
	for(key in myEvent){
		if(key === 'Photo') {
			initImageUpload();      
	    }else {
			const li = document.createElement('li');
			li.innerHTML = `${key}: ${myEvent[key]}`;
			ul.appendChild(li);
			ulArray.push(li.innerHTML)
			

		
           li.onclick = function(ev){
			   
			 let index = ulArray.indexOf(li.innerHTML);
			  console.log(li.innerHTML+' index '+`${index}`);  
			  
		   }
		  
		}  
	 	
	}
	
	
	 
	const button = document.createElement('button');
			button.innerHTML = "<button>Delete</button>";
			button.setAttribute('class', 'slt');
			ul.appendChild(button);
			button.onclick=deleteEvents;
			

	const editbtn = document.createElement('button');
			 editbtn.innerHTML = "<button>Edit</button>";
			 editbtn.setAttribute('class', 'slt');
			 ul.appendChild(editbtn);
			 editbtn.onclick = editEvents;
          
}
function deleteEvents(){
	//const eventClass = document.querySelector('.div-grid');
	console.log(eventClass.childNodes[1])
	eventClass.removeChild(eventClass.childNodes[1]);	
}

function editEvents(){
	//const eventClass = document.getElementById('eventClass');
	//const ul = eventClass.childNodes[1];
	
	eventType.value = ul.childNodes[0].textContent.slice(6);
	eventName.value = ul.childNodes[1].textContent.slice(6);
	eventVenue.value = ul.childNodes[2].textContent.slice(7);
	eventDate.value =  ul.childNodes[3].textContent.slice(6);
	eventGuests.value =  ul.childNodes[4].textContent.slice(8);
	eventComment.value =  ul.childNodes[5].textContent.slice(9);
	//eventPhoto.value =  
	
	 
	 
	console.log(ul.childNodes[0].textContent);   
}
window.addEventListener('DOMContentLoaded', initImageUpload);

function initImageUpload(){
	
	eventPhoto.addEventListener('change', handleManualUpload);
	function handleManualUpload(ev){
		const file = ev.target.files[0];
		 handleFile(file)
		 
		 console.log(file);     	
	}
}
function handleFile(file){
	const reader = new FileReader()
	reader.onloadend = function(event){
		const imageStore = new Image()
		imageStore.onload = function(ev){
			canvas.height = 350;
			canvas.width = 350;
			
			const height = 300;
			const width = 300;

			ctx.drawImage(ev.target, 0,0,width, height);
			ul.appendChild(canvas); 
		}
		imageStore.src = event.target.result;
	}
	reader.readAsDataURL(file);
} 

