const gallery = document.getElementById('gallery');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('search');


const dogNames = [
  "Buddy", "Max", "Bella", "Charlie", "Molly", "Rocky", "Lucy", "Daisy", 
  "Cooper", "Bailey", "Luna", "Sadie", "Zoey", "Jack", "Teddy", "Ruby", 
  "Oliver", "Milo", "Riley", "Coco"
];


function getRandomName() {
  return dogNames[Math.floor(Math.random() * dogNames.length)];
}


async function loadPhotos() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/15');
    const data = await response.json();

    
    gallery.innerHTML = '';

    data.message.forEach((imageUrl) => {
      const photoCard = document.createElement('div');
      photoCard.className = 'photo-card';
      const dogName = getRandomName(); 
      photoCard.innerHTML = `
        <img src="${imageUrl}" alt="${dogName}">
        <p>${dogName}</p>
      `;
      gallery.appendChild(photoCard);
    });
  } catch (error) {
    console.error('Erro ao carregar fotos:', error);
    noResults.style.display = 'block';
    noResults.textContent = 'Erro ao carregar fotos. Tente novamente mais tarde.';
  }
}


function filterPhotos() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const photos = document.querySelectorAll('.photo-card');

  let hasResults = false;
  photos.forEach(photo => {
    const caption = photo.querySelector('p').textContent.toLowerCase();
    if (caption.includes(searchQuery)) {
      photo.style.display = '';
      hasResults = true;
    } else {
      photo.style.display = 'none';
    }
  });

  noResults.style.display = hasResults ? 'none' : 'block';
  noResults.textContent = hasResults ? '' : 'Nenhuma foto encontrada.';
}
searchInput.addEventListener('input', filterPhotos);

loadPhotos();
