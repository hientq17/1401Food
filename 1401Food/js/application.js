
$(function () {
    var thisTotal = JSON.parse(localStorage.getItem('Orders'));
    var total_price = 0;

    if (thisTotal !== null) {
        thisTotal.forEach(e => {
            total_price += (e.price * e.quantity);
        });

        var money = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(total_price).toLocaleString();
        $(".total-price").text(money.split('￥')[1] + '₫');
        $(".total-item").text(thisTotal.length);
    }else{
        $(".total-price").text('0₫');
        $(".total-item").text(0);
    }

    _initEvents();
    _initShoppingCart();
    _initCheckout();
    _initDetail();
});

function _initEvents() {
    $(".buy").click(function () {
        var currentOrders = JSON.parse(localStorage.getItem('Orders'));

        var listOrders = [];

        var item = {
            name: $(this).data("name"),
            price: $(this).data("price"),
            image: $(this).data("image"),
            quantity: 1
        }; 

        if (currentOrders !== null) {
            listOrders = currentOrders;
        }

        let isExisted = false;

        listOrders.forEach(e => {
            if(e.name == item.name){
                e.quantity = Number(e.quantity)+1;
                isExisted = true;
                return;
            }
        })

        if(!isExisted){
            listOrders.push(item);
        }

        localStorage.setItem('Orders', JSON.stringify(listOrders));

        var thisTotal = JSON.parse(localStorage.getItem('Orders'));
        var total_price = 0;

        thisTotal.forEach(e => {
            total_price += (e.price * e.quantity);
        });

        var money = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(total_price).toLocaleString();
        $(".total-price").text(money.split('￥')[1] + '₫');
        $(".total-item").text(thisTotal.length);
    });

    $(".btn-payment").click(function (e) {
        e.preventDefault();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đặt hàng thành công',
            showConfirmButton: false,
            timer: 1500
        })
        
        localStorage.removeItem('Orders');
        setTimeout(function(){ location.href = 'index.html'; }, 2000);
    });

    $(".detail-item").click(function () {
        var item = {
            name: $(this).data("name"),
            price: $(this).data("price"),
            image: $(this).data("image"),
            quantity: 1
        };
        localStorage.setItem('CurrentItem', JSON.stringify(item)); 
    });
}

function _initShoppingCart() {
    var currentOrders = JSON.parse(localStorage.getItem('Orders'));

    var html = '';
    var total_price = 0;
    if (currentOrders !== null) {
        currentOrders.forEach(e => {
            var money = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(e.price).toLocaleString();
            var money_convert = money.split('￥')[1] + '₫';
            var total = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(e.price * e.quantity).toLocaleString();
            var total_convert = total.split('￥')[1] + '₫';
            html += `<tr>
                        <td class="shoping__cart__item">
                            <img src="${e.image.replace('-', '/')}" style="width: 100px; height: 100px;" alt="">
                            <h5>${e.name}</h5>
                        </td>
                        <td class="shoping__cart__price">
                            ${money_convert}
                        </td>
                        <td class="shoping__cart__quantity">
                            <div class="quantity">
                                <div class="pro-qty">
                                    <input type="text" value="${e.quantity} kg" readonly>
                                </div>
                            </div>
                        </td>
                        <td class="shoping__cart__total">
                            ${total_convert}
                        </td>
                        
                        <td class="shoping__cart__item__close">
                            <span data-name="${e.name}" class="icon_close" onclick="deleteItem(this)"></span>
                        </td>
                    </tr>`
            total_price += (e.price * e.quantity);
        });
    }
    $(".table-body").html(html);
    var money = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(total_price).toLocaleString();
    $(".total-price").text(money.split('￥')[1] + '₫');
}

function deleteItem(x){
    console.log("delete-item");
    var currentOrders = JSON.parse(localStorage.getItem('Orders'));

    var listOrders = [];

    if (currentOrders !== null) {
        listOrders = currentOrders;
    }

    let itemName = $(x).data("name");

    listOrders = listOrders.filter(function(e, index, arr){ 
        return e.name != itemName;
    });

    localStorage.setItem('Orders', JSON.stringify(listOrders));

    _initShoppingCart();
}

function _initCheckout() {

    var currentOrders = JSON.parse(localStorage.getItem('Orders'));

    var html = '';

    if (currentOrders !== null) {
        currentOrders.forEach(e => {
            var total = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(e.price * e.quantity).toLocaleString();
            var total_convert = total.split('￥')[1] + '₫';
            html += `<li>${e.name}<span>${total_convert}</span></li>`

        });
    }

    $(".ul-item").html(html)
}

function _initDetail() {
    var currentItem = JSON.parse(localStorage.getItem('CurrentItem'));
    if(currentItem != null){
        $("#detail-item-name").text(currentItem.name);
        $("#detail-item-price").text(currentItem.price);
        $("#detail-item-image").attr('src',currentItem.image);
        $("#detail-item-data").attr('data-name',currentItem.name);
        $("#detail-item-data").attr('data-price',currentItem.price);
        $("#detail-item-data").attr('data-image',currentItem.image);
    }
}