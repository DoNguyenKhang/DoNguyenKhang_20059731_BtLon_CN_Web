fetch("js/children_fashion_data.json")
  .then((res) => res.json())
  .then((data) => {
    // Hiển thị tất cả sản phẩm ban đầu
    displayProduct(data);

    // Gắn sự kiện cho các bộ lọc
    document
      .getElementById("price-filter")
      .addEventListener("change", () => filterProducts(data));
    document
      .getElementById("size-filter")
      .addEventListener("change", () => filterProducts(data));
    document
      .getElementById("gender-filter")
      .addEventListener("change", () => filterProducts(data));
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });

function displayProduct(products) {
  const productList = document.getElementById("product-list");

  const productHTML = products
    .map((product) => {
      return `
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="w-100" src="${product.image}" height="300px" alt="${product.name}">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3">${product.name}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>${product.price} VND</h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <a href="#" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                         <button class="btn btn-sm text-dark p-0" onclick="addToCart('${product.image}', '${product.name}', '${product.category}', ${product.price}, '${product.size}', '${product.gender}')">
                                    <i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                        </button>
                    </div>
                </div>                      
            </div>
        `;
    })
    .join("");

  productList.innerHTML = productHTML;
}

function filterProducts(data) {
  const priceFilter = document.getElementById("price-filter").value;
  const sizeFilter = document.getElementById("size-filter").value;
  const genderFilter = document.getElementById("gender-filter").value;

  // Lọc sản phẩm dựa trên các tiêu chí
  const filteredProducts = data.filter((product) => {
    let isPriceMatch = true;
    let isSizeMatch = true;
    let isGenderMatch = true;

    // Lọc theo giá
    if (priceFilter !== "all") {
      isPriceMatch = product.price <= parseInt(priceFilter);
    }

    // Lọc theo size
    if (sizeFilter !== "all") {
      isSizeMatch = product.sizes.includes(sizeFilter);
    }

    // Lọc theo giới tính
    if (genderFilter !== "all") {
      isGenderMatch = product.gender === genderFilter;
    }

    return isPriceMatch && isSizeMatch && isGenderMatch;
  });

  // Hiển thị các sản phẩm đã lọc
  displayProduct(filteredProducts);
}

function addToCart(image, name, category, price, size, gender) {
  //Lấy giỏi hàng trong lưu trưc (Nếu có)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //Kiểm tra xem có sản phẩm trong cart hay chưa
  const checkCart = cart.findIndex((item) => item.name === name);

  if (checkCart > -1) {
    cart[checkCart].quantity += 1;
  } else {
    cart.push({
      image: image,
      name: name,
      category: category,
      price: price,
      size: size,
      gender: gender,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href= "cart.html";
}
