const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().ptitle}</td>
      <td>${doc.data().pdomain}</td>
      <td>${doc.data().pdescription}</td>
      <td>${doc.data().ptechused}</td>
      <td>${doc.data().pintroduction}</td>
      <td>${doc.data().packnowledgement}</td>
      <td>${doc.data().problemstatement}</td>
      <td>${doc.data().Projectlink}</td>
      <td>${doc.data().pvideo}</td>
      <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.ptitle.value = doc.data().ptitle;
    editModalForm.pdomain.value = doc.data().pdomain;
    editModalForm.pdescription.value = doc.data().pdescription;
    editModalForm.ptechused.value = doc.data().ptechused;
    editModalForm.pintroduction.value = doc.data().pintroduction;
    editModalForm.packnowledgement.value = doc.data().packnowledgement;
    editModalForm.problemstatement.value = doc.data().problemstatement;
    editModalForm.Projectlink.value = doc.data().Projectlink;
    editModalForm.pvideo.value = doc.data().pvideo;

  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.ptitle.value = '';
  addModalForm.pdomain.value = '';
  addModalForm.pdescription.value = '';
  addModalForm.ptechused.value = '';
  addModalForm.pintroduction.value = '';
  addModalForm.packnowledgement.value = '';
  addModalForm.problemstatement.value = '';
  addModalForm.Projectlink.value = '';
  addModalForm.pvideo.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener
db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    ptitle: addModalForm.ptitle.value,
    pdomain: addModalForm.pdomain.value,
    pdescription: addModalForm.pdescription.value,
    ptechused: addModalForm.ptechused.value,
    pintroduction: addModalForm.pintroduction.value,
    packnowledgement: addModalForm.packnowledgement.value,
    problemstatement: addModalForm.problemstatement.value,
    Projectlink: addModalForm.Projectlink.value,
    pvideo: addModalForm.pvideo.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    ptitle: addModalForm.ptitle.value,
    pdomain: addModalForm.pdomain.value,
    pdescription: addModalForm.pdescription.value,
    ptechused: addModalForm.ptechused.value,
    pintroduction: addModalForm.pintroduction.value,
    packnowledgement: addModalForm.packnowledgement.value,
    problemstatement: addModalForm.problemstatement.value,
    Projectlink: addModalForm.Projectlink.value,
    pvideo: addModalForm.pvideo.value,
  });
  editModal.classList.remove('modal-show');
  
});
