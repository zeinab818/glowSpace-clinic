document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('sp'));
    this.classList.add('sp');
   });
});
