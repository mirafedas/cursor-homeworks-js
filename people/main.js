function SuperUser() {
  this.isDataVisible = false;
}

SuperUser.prototype.changeDataVisibility = function() {
  this.isDataVisible = !this.isDataVisible;
}

SuperUser.prototype.getIsVisible = function() {
  return this.isDataVisible;
}

function User(options) {
  this.name = options.name;
  this.gender = options.gender;
  this.birthDate = options.birthDate;
  this.address = options.address;
  this.phone = options.phone;
  this.email = options.email;
}

User.prototype = new SuperUser();

let users = [];

function SaveUser(e) {
  e.preventDefault();
  let form = $('form');
  let name = form.find('[name=name]').val();
  let birthDate = form.find('[name=birthDate]').val();
  let address = form.find('[name=address]').val();
  let phone = form.find('[name=phone]').val();
  let email = form.find('[name=email]').val();
  let radioButtons = form.find('[name=gender]').toArray();
  let gender;
  radioButtons.forEach(b => {
    if (b.checked) gender = $(b).val();
  });
  if (name && gender && birthDate && address && phone && email) {
    let user = new User({name, gender, birthDate, address, phone, email});
    users.push(user);
    updateUI();
  } else {
    alert('You must fill all fields!');
  }
  form[0].reset();
}

function updateUI() {
  let html = users.map((u, index) => {
    let visible = u.getIsVisible();
    let style = visible ? 'style="display: none"' : '';
    return `
      <tr id=${index} onclick="hideFieldsOfUser(event)">
        <td>${u.name}</td>
        <td ${style}>${u.gender}</td>
        <td ${style}>${u.birthDate}</td>
        <td ${style}>${u.address}</td>
        <td ${style}>${u.phone}</td>
        <td ${style}>${u.email}</td>
      </tr>`    
  });
  $('tbody').html(html);
}

function hideFieldsOfUser(e) {
  let id = $(e.target).parent().attr('id');
  users[id].changeDataVisibility();
  updateUI();
}
