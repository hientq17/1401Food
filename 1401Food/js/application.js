
$(function () {
    var thisTotal = JSON.parse(localStorage.getItem('Orders'));
    var total_price = 0;

    thisTotal.forEach(e => {
        total_price += (e.price * e.quantity);
    });

    var money = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(total_price).toLocaleString();
    $(".total-price").text(money.split('￥')[1] + '₫');
    $(".total-item").text(thisTotal.length);

    _initEvents();
    _initShoppingCart();
    _initCheckout();
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

        listOrders.push(item);

        localStorage.setItem('Orders', JSON.stringify(listOrders));

        var thisTotal = JSON.parse(localStorage.getItem('Orders'));
        var total_price = 0;

        thisTotal.forEach(e => {
            total_price += (e.price * e.quantity);
        });

        $(".total-price").text(total_price);
        $(".total-item").text(thisTotal.length);
    });
}

function _initShoppingCart() {
    var currentOrders = JSON.parse(localStorage.getItem('Orders'));

    var html = '';

    currentOrders.forEach(e => {

        var money = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(e.price).toLocaleString();
        var money_convert = money.split('￥')[1] + '₫';
        var total = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(e.price * e.quantity).toLocaleString();
        var total_convert = total.split('￥')[1] + '₫';
        html += `<tr>
                                    <td class="shoping__cart__item">
                                        <img src="${e.image.replace('-', '/')}" style="width: 100px; height: 100px;" alt="">
                                        <h5>Khô gà lá chanh</h5>
                                    </td>
                                    <td class="shoping__cart__price">
                                        ${money_convert}
                                    </td>
                                    <td class="shoping__cart__quantity">
                                        <div class="quantity">
                                            <div class="pro-qty">
                                                <input type="text" value="${e.quantity}">
                                            </div>
                                        </div>
                                    </td>
                                    <td class="shoping__cart__total">
                                        ${total_convert}
                                    </td>
                                    <td class="shoping__cart__item__close">
                                        <span class="icon_close"></span>
                                    </td>
                                </tr>`

    });
    
    $(".table-body").html(html)
}

function _initCheckout(){
    
    var currentOrders = JSON.parse(localStorage.getItem('Orders'));

    var html = '';

    currentOrders.forEach(e => {
        var total = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(e.price * e.quantity).toLocaleString();
        var total_convert = total.split('￥')[1] + '₫';
        html += `<li>${e.name}<span>${total_convert}</span></li>`

    });
    
    $(".ul-item").html(html)
}