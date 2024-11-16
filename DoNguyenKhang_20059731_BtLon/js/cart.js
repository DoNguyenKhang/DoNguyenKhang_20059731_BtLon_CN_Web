// Lấy giỏ hàng từ Local Storage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.querySelector("#cart-table-body");
  let total = 0;

  // Xóa nội dung cũ
  cartTableBody.innerHTML = "";

  // Duyệt qua từng sản phẩm và thêm vào bảng
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartTableBody.innerHTML += `
            <tr>
                <td class="align-middle"><img src="${item.image}" alt="${item.name}" style="width: 50px;"> ${item.name}</td>
                <td class="align-middle">${item.price} VND</td>
                <td class="align-middle">
                    <input type="number" class="form-control form-control-sm bg-secondary text-center quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                </td>
                <td class="align-middle">${itemTotal} VND</td>
                <td class="align-middle"><button class="btn btn-sm btn-danger remove-item" data-index="${index}"><i class="fa fa-times"></i></button></td>
            </tr>
        `;
  });

  // Cập nhật tổng tiền
  document.getElementById("cart-total").textContent = `${total}`;
}

// Xóa sản phẩm khỏi giỏ hàng
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
    const index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});

// Cập nhật số lượng sản phẩm
document.addEventListener("input", function (event) {
  if (event.target.classList.contains("quantity-input")) {
    const index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(event.target.value);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});

// Tải giỏ hàng khi trang được mở
document.addEventListener("DOMContentLoaded", loadCart);
