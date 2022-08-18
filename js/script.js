const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');


// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
  // WINBOX UI
  const qrcode2 = new QRCode('WINBOX_QR_Display', {
    text: url,
    width: size,
    height: size,
  });
  showWinBox();
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }

  const wnBox = document.getElementById('WINBOX_QR_Display');
  wnBox.innerHTML = '';
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};
hideSpinner();
form.addEventListener('submit', onGenerateSubmit);


//SHOW WINBOX INTERFACE
function showWinBox() {
	// OUTPUT RESULT WITH WINBOX LIBRARY
	const qrImgOutput = document.querySelector('#WINBOX_QR_Display')
	const aboutBox = new WinBox({
		title: 'QR Code Generated',
		// modal: true,
		width: '300px',
		height: '80px',
		top: 50,
		right: 5,
		bottom: 5,
		left: 5,
		mount: qrImgOutput,
		onfocus: function () {
			this.setBackground('lightslategrey')
		},
		onblur: function () {
			this.setBackground('#777')
		},
	})
}