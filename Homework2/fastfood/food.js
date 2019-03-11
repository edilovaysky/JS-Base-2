class BurgerList {
    constructor() {
        this.burger = []
    }
    fetchBurgers() {
        this.burgers = [
            {
                title: 'Маленький',
                price: 50,
                calories: 20
            },
            {
                title: 'Большой',
                price: 100,
                calories: 40
            },
    ]
    }
    getSelected() {
        const selectBurger = prompt('Выберете бургер: ' + choiceBurger.burgers[0].title + ' за ' + choiceBurger.burgers[0].price + ' руб ' + ' или ' + choiceBurger.burgers[1].title + ' за ' + choiceBurger.burgers[1].price + ' руб ' + ' напишите 1 если маленький и 2 если большой');

        let burgerIndex = null;
        if (selectBurger == 1) {
            alert('Вы выбрали маленький бургер');
            burgerIndex = 0;
        } else if (selectBurger == 2) {
            alert('Вы выбрали большой бургер');
            burgerIndex = 1;
        } else {
            alert('Вы ничего не выбрали');
        }


        let selected;
        let list = new BurgerList();
        list.fetchBurgers();
        if (burgerIndex == 0) {
            selected = list.burgers[0];
        } else if (burgerIndex == 1) {
            selected = list.burgers[1];
        }
        return selected;
    }

};


class AdditivesList {
    constructor() {
        this.additives = []
    }
    fetchAdditives() {
        this.additives = [
            {
                title: 'С сыром',
                price: 10,
                calories: 20
            },
            {
                title: 'С салатом',
                price: 20,
                calories: 5
            },
            {
                title: 'С картофелем',
                price: 15,
                calories: 10
            },
            {
                title: 'С приправой',
                price: 15,
                calories: 0
            },
            {
                title: 'С майонезом',
                price: 20,
                calories: 5
            },

    ]
    }
    getSelected() {
        const selectAdditives = prompt('Выберете добавку: ' + choiceAdditives.additives[0].title + ' за ' + choiceAdditives.additives[0].price + ' руб нажмите 1; ' + ' или ' + choiceAdditives.additives[1].title + ' за ' + choiceAdditives.additives[1].price + ' руб нажмите 2; ' + ' или ' + choiceAdditives.additives[2].title + ' за ' + choiceAdditives.additives[2].price + ' руб нажмите 3; ' + ' или ' + choiceAdditives.additives[3].title + ' за ' + choiceAdditives.additives[3].price + ' руб нажмите 4; ' + ' или ' + choiceAdditives.additives[4].title + ' за ' + choiceAdditives.additives[4].price + ' руб нажмите 5. ');

        let additivesIndex = null;
        if (selectAdditives == 1) {
            alert('Вы выбрали добавку с сыром');
            additivesIndex = 0;
        } else if (selectAdditives == 2) {
            alert('Вы выбрали добавку с салатом');
            additivesIndex = 1;
        } else if (selectAdditives == 3) {
            alert('Вы выбрали добавку с картофелем');
            additivesIndex = 2;
        } else if (selectAdditives == 4) {
            alert('Вы выбрали добавку с приправой');
            additivesIndex = 3;
        } else if (selectAdditives == 5) {
            alert('Вы выбрали добавку с майонезом');
            additivesIndex = 4;
        } else {
            alert('Вы ничего не выбрали, выберете не менее 1 добавки');
        }


        let selected;
        let list = new AdditivesList();
        list.fetchAdditives();
        if (additivesIndex == 0) {
            selected = list.additives[0];
        } else if (additivesIndex == 1) {
            selected = list.additives[1];
        } else if (additivesIndex == 2) {
            selected = list.additives[2];
        } else if (additivesIndex == 3) {
            selected = list.additives[3];
        } else if (additivesIndex == 4) {
            selected = list.additives[4];
        }
        return selected;
    }
};


const choiceBurger = new BurgerList();
choiceBurger.fetchBurgers();


const choiceAdditives = new AdditivesList();
choiceAdditives.fetchAdditives();


window.onload = function init() {
    const burger = new BurgerList();
    const selectedBurger = burger.getSelected();
    console.log(selectedBurger);
    
    if (selectedBurger == undefined) {
        const selectedBurger = burger.getSelected();
        console.log(selectedBurger);
    }
    
    const burgerPrice = selectedBurger.price;
    console.log(burgerPrice);
    const burgerCalories = selectedBurger.calories;
    console.log(burgerCalories);
    

    const additives = new AdditivesList();
    const selectedAdditives = additives.getSelected();
    console.log(selectedAdditives);
    
    if (selectedAdditives == undefined) {
        const selectedAdditives = additives.getSelected();
        console.log(selectedAdditives);
    }
    
    const additivesPrice = selectedAdditives.price;
     console.log(additivesPrice);
    const additivesCalories = selectedAdditives.calories;
    console.log(additivesCalories);
    
    const priceSum = burgerPrice + additivesPrice;
    const caloriesSum = additivesCalories + burgerCalories;
    
    console.log(priceSum);
    console.log(caloriesSum);
    alert('Ваш заказ на суму '+ priceSum + ' Рублей.  ' + ' Энергетическая ценность ' + caloriesSum + ' Kkl');
    //init();
}


