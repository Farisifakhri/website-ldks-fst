// Filter kategori blog
const filterBtns = document.querySelectorAll(".filter-btn");
const blogCards = document.querySelectorAll(".blog-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Hapus class active dari semua
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    blogCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
