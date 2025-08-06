// Modal logic
const modal = document.getElementById('characterModal');
const closeModalBtn = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const serious = document.getElementById('serious');
const chaos = document.getElementById('chaos');
const modalType = document.getElementById('modalType');
const pronouns = document.getElementById('pronouns');
const modalInterests = document.getElementById('modalInterests');
const modalBestFor = document.getElementById('modalBestFor');
const modalFact = document.getElementById('modalFact');
const modalLink = document.getElementById('modalLink');
const modalQuestionMark = document.getElementById('modalQuestionMark');
const characterEls = document.querySelectorAll('.character');

characterEls.forEach((el, idx) => {
  el.addEventListener('click', (e) => openModal(e, idx));
});

function openModal(e, idx) {
  e.preventDefault();
  e.stopPropagation();
  const details = characterDetails[idx];
  if (!details) return;
  displayCharacterDetails(details);
}

function displayCharacterDetails(details) {
  modalName.textContent = details.name;
  serious.textContent = details.serious ? '✅' : '❌';
  chaos.textContent = details.chaos ? '✅' : '❌';
  modalType.textContent = details.type ? `Type: ${details.emotion}` : '';
  pronouns.textContent = details.pronouns ? `pronouns: ${details.pronouns}` : 'pronouns: Unknown';
  modalInterests.textContent = details.interests ? `Interests: ${details.interests}` : '';
  modalBestFor.textContent = details.bestFor ? `Best for: ${details.bestFor}` : '';
  modalFact.textContent = details.funFact ? `Fun Fact: ${details.funFact}` : 'No fun fact available';
  modalLink.href = details.link;
  if (details.img === "") {
    modalImg.style.display = 'none';
    modalQuestionMark.style.display = 'block';
  } else {
    modalImg.src = details.img;
    modalImg.alt = details.name;
    modalImg.style.display = 'inline';
    modalQuestionMark.style.display = 'none';
  }
  modal.style.display = 'flex';
}

closeModalBtn.onclick = function() {
  modal.style.display = 'none';
};
window.addEventListener('click', function(e) {
  if (e.target === modal) modal.style.display = 'none';
});