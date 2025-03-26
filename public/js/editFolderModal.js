const dialog = document.querySelector('#editFolderDialog');
const showDialogButtons = document.querySelectorAll('#openEditFolderModalBtn');
const saveButton = dialog.querySelector('.save-button');
const closeButton = dialog.querySelector('.close-button');
const editFolderForm = dialog.querySelector('form');

const folderNameInput = dialog.querySelector('input[id="name"]');

showDialogButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dialog.showModal();

    const folder = JSON.parse(button.dataset.folder);
    folderNameInput.value = folder.name;

    // Set the form action
    editFolderForm.action = `/folders/${folder.id}/update`;
  });
});

closeButton.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.close();
});
