function calculateBMI() {
    let heightInput = document.getElementById("height").value;
    let weightInput = document.getElementById("weight").value;
    let ageInput = document.getElementById("age").value;

    if (heightInput === "" || weightInput === "" || ageInput === "") {
        alert("Пожалуйста, заполните все поля");
        return;
    }

    let height = Number(heightInput);
    let weight = Number(weightInput);
    let age = Number(ageInput);
    let gender = document.getElementById("gender").value;

    if (isNaN(height) || isNaN(weight) || isNaN(age)) {
        alert("Введите корректные числовые значения");
        return;
    }

    if (height <= 0 || weight <= 0 || age <= 0) {
        alert("Значения должны быть больше нуля");
        return;
    }

    if (height < 50 || height > 300) {
        alert("Рост должен быть 50–300 см");
        return;
    }

    if (weight < 10 || weight > 300) {
        alert("Вес должен быть 10–300 кг");
        return;
    }

    if (age < 1 || age > 120) {
        alert("Возраст должен быть 1–120 лет");
        return;
    }

    height = height / 100;
    let bmi = (weight / (height * height)).toFixed(1);

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("recommendations").classList.remove("hidden");
    document.getElementById("bmiValue").innerHTML = `ИМТ: <strong>${bmi}</strong>`;

    let category = "";
    let row = "";
    let color = "";

    document.querySelectorAll("tr").forEach(tr => tr.classList.remove("highlight"));

    if (bmi < 18.5) {
        category = "Недостаток массы";
        row = "row1";
        color = "#3b82f6";
    } else if (bmi < 25) {
        category = "Норма";
        row = "row2";
        color = "#22c55e";
    } else if (bmi < 30) {
        category = "Избыточный вес";
        row = "row3";
        color = "#f59e0b";
    } else {
        category = "Ожирение";
        row = "row4";
        color = "#ef4444";
    }

    document.getElementById("bmiCategory").innerText = category;
    document.getElementById("bmiCategory").style.color = color;
    document.getElementById(row).classList.add("highlight");

    generateRecommendations(bmi, age, gender);

    let pos;
    if (bmi < 18.5) {
        pos = (bmi / 18.5) * 25;
    } else if (bmi < 25) {
        pos = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    } else if (bmi < 30) {
        pos = 50 + ((bmi - 25) / (30 - 25)) * 25;
    } else {
        pos = 75 + Math.min((bmi - 30) / 10, 1) * 25;
    }
    pos = Math.min(Math.max(pos, 0), 98);
    document.getElementById("indicator").style.left = pos + "%";
	showSaveButton();  // Показываем кнопку сохранения
}

function generateRecommendations(bmi, age, gender) {
    let food = "";
    let activity = "";
    let water = "";
    let sleep = "";

    if (bmi < 18.5) {
        food = `У вас наблюдается недостаток массы тела. Рекомендуется увеличить суточную калорийность рациона за счёт полезных продуктов. Включите больше белковой пищи (мясо, рыба, яйца, бобовые), сложные углеводы (каши, цельнозерновой хлеб) и полезные жиры (орехи, авокадо). Питайтесь регулярно 4–5 раз в день, избегайте пропусков приёмов пищи.`;
        activity = `Основной упор стоит сделать на силовые тренировки, направленные на набор мышечной массы. Рекомендуется заниматься 3–4 раза в неделю, постепенно увеличивая нагрузку. Кардио нагрузки должны быть умеренными.`;
    } else if (bmi < 25) {
        food = `Ваш вес находится в пределах нормы. Рекомендуется придерживаться сбалансированного питания. Включайте достаточное количество белков, жиров и углеводов. Ограничьте потребление сахара и сильно переработанных продуктов.`;
        activity = `Поддерживайте регулярную физическую активность: 2–3 тренировки в неделю. Это могут быть прогулки, плавание, фитнес или лёгкие силовые упражнения.`;
    } else {
        food = `У вас наблюдается избыточная масса тела. Рекомендуется снизить калорийность рациона. Сократите потребление сахара, фастфуда и жирной пищи. Увеличьте долю овощей, клетчатки и белка. Питайтесь небольшими порциями 4–5 раз в день.`;
        activity = `Рекомендуется регулярная физическая активность: кардио нагрузки 3–5 раз в неделю. Подойдут ходьба, бег, велосипед, плавание. Дополнительно можно включить лёгкие силовые тренировки.`;
    }

    water = `Рекомендуется употреблять 30–35 мл воды на 1 кг массы тела. Пейте воду равномерно в течение дня, не дожидаясь сильной жажды. Ограничьте сладкие и газированные напитки.`;
    sleep = `Рекомендуемая продолжительность сна — 7–9 часов. Недостаток сна может замедлять обмен веществ и способствовать набору веса. Старайтесь ложиться и вставать в одно и то же время.`;

    if (age > 40) {
        activity += ` Учитывая возраст, рекомендуется уделять внимание суставам. Избегайте чрезмерных нагрузок и делайте разминку перед тренировками.`;
    }

    if (gender === "female") {
        food += ` Обратите внимание на достаточное потребление железа, кальция и витаминов.`;
    } else {
        activity += ` Можно постепенно увеличивать интенсивность силовых тренировок для поддержания мышечной массы.`;
    }

    document.getElementById("food").innerText = food;
    document.getElementById("activity").innerText = activity;
    document.getElementById("water").innerText = water;
    document.getElementById("sleep").innerText = sleep;
}

// ========== МОДАЛЬНОЕ ОКНО (как в примере IT-Test) ==========

// Текущий пользователь
let currentUser = null;

// Открыть модальное окно
function openModal() {
    document.getElementById('authModal').style.display = 'flex';
}

// Закрыть модальное окно
function closeModal() {
    document.getElementById('authModal').style.display = 'none';
    
    // Очищаем поля
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('regName').value = '';
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
}

// Переключение вкладок
function showTab(tab) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.add('hidden');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerTab').classList.remove('active');
    
    document.getElementById(tab).classList.remove('hidden');
    if (tab === 'login') {
        document.getElementById('loginTab').classList.add('active');
    } else {
        document.getElementById('registerTab').classList.add('active');
    }
}

// Обработка входа
function loginUser() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!username || !password) {
        alert('❌ Заполните логин и пароль');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUI();
        closeModal();
    } else {
        alert('❌ Неверный логин или пароль');
    }
}

// Обработка регистрации
function registerUser() {
    const name = document.getElementById('regName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    
    if (!name || !username || !password) {
        alert('❌ Заполните все поля');
        return;
    }
    
    if (username.length < 3) {
        alert('❌ Логин должен быть минимум 3 символа');
        return;
    }
    
    if (password.length < 4) {
        alert('❌ Пароль должен быть минимум 4 символа');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.username === username)) {
        alert('❌ Пользователь с таким логином уже существует');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        username: username,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    updateUI();
    closeModal();
}

// Выход
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUI();
    
    // Скрываем личный кабинет
    const personalAccount = document.getElementById('personalAccount');
    if (personalAccount) personalAccount.classList.add('hidden');
    
    // Скрываем кнопку сохранения
    const saveBtn = document.getElementById('saveResultBtn');
    if (saveBtn) saveBtn.classList.add('hidden');
}

// Обновление интерфейса
function updateUI() {
    const loginBtn = document.querySelector('.login-btn');
    
    if (currentUser) {
        loginBtn.textContent = `👤 ${currentUser.name}`;
        loginBtn.onclick = function() { logout(); };
        renderHistory();  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
    } else {
        loginBtn.textContent = 'Войти';
        loginBtn.onclick = function() { openModal(); };
        
        // Скрываем личный кабинет при выходе
        const personalAccount = document.getElementById('personalAccount');
        if (personalAccount) personalAccount.classList.add('hidden');
        
        // Скрываем кнопку сохранения
        const saveBtn = document.getElementById('saveResultBtn');
        if (saveBtn) saveBtn.classList.add('hidden');
    }
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Восстанавливаем сессию только если пользователь был сохранён
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateUI();
    }
    
    // Закрытие модального окна при клике на фон
    window.onclick = function(event) {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            closeModal();
        }
    };
});

// ========== СОХРАНЕНИЕ ИСТОРИИ ИМТ ==========

// Сохранение текущего результата
function saveCurrentResult() {
    if (!currentUser) {
        alert('❌ Войдите в аккаунт, чтобы сохранять результаты');
        return;
    }
    
    const bmiText = document.getElementById("bmiValue").innerText;
    const bmiValue = parseFloat(bmiText.replace("ИМТ: ", ""));
    const bmiCategory = document.getElementById("bmiCategory").innerText;
    const bmiColor = document.getElementById("bmiCategory").style.color;
    
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].text;
    
    const foodText = document.getElementById("food").innerText;
    const activityText = document.getElementById("activity").innerText;
    const waterText = document.getElementById("water").innerText;
    const sleepText = document.getElementById("sleep").innerText;
    
    const result = {
        id: Date.now(),
        date: new Date().toLocaleString('ru-RU'),
        bmi: bmiValue,
        category: bmiCategory,
        color: bmiColor,
        height: height,
        weight: weight,
        age: age,
        gender: gender,
        recommendations: {
            food: foodText,
            activity: activityText,
            water: waterText,
            sleep: sleepText
        }
    };
    
    // Получаем существующую историю
    let history = JSON.parse(localStorage.getItem(`bmi_history_${currentUser.id}`)) || [];
    history.unshift(result); // Добавляем в начало (новые сверху)
    
    // Ограничиваем историю 50 записями
    if (history.length > 50) history = history.slice(0, 50);
    
    localStorage.setItem(`bmi_history_${currentUser.id}`, JSON.stringify(history));

    renderHistory(); // Обновляем отображение
}

// Отображение истории
function renderHistory() {
    if (!currentUser) return;
    
    const history = JSON.parse(localStorage.getItem(`bmi_history_${currentUser.id}`)) || [];
    const historyList = document.getElementById('historyList');
    const personalAccount = document.getElementById('personalAccount');
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-history">📭 У вас пока нет сохранённых результатов. Рассчитайте ИМТ и нажмите «Сохранить».</div>';
        document.getElementById('totalMeasurements').textContent = '0';
        document.getElementById('avgBMI').textContent = '0';
        document.getElementById('bestCategory').textContent = '—';
        return;
    }
    
    // Статистика
    const bmis = history.map(h => h.bmi);
    const avgBmi = (bmis.reduce((a, b) => a + b, 0) / bmis.length).toFixed(1);
    
    // Находим лучшую категорию (норма считается лучшей)
    const categories = history.map(h => h.category);
    const normalCount = categories.filter(c => c === 'Норма').length;
    let bestCategory = '—';
    if (normalCount > 0) bestCategory = '🎯 Норма';
    else if (categories.includes('Недостаток массы')) bestCategory = '⚠️ Недостаток';
    else if (categories.includes('Избыточный вес')) bestCategory = '⚠️ Избыток';
    else bestCategory = '❗ Ожирение';
    
    document.getElementById('totalMeasurements').textContent = history.length;
    document.getElementById('avgBMI').textContent = avgBmi;
    document.getElementById('bestCategory').textContent = bestCategory;
    
    // Отрисовка списка
    let html = '';
    history.forEach(item => {
        const categoryClass = item.category === 'Норма' ? 'history-category' : 'history-category';
        const categoryColor = item.category === 'Норма' ? '#22c55e' : 
                              item.category === 'Недостаток массы' ? '#3b82f6' :
                              item.category === 'Избыточный вес' ? '#f59e0b' : '#ef4444';
        
        html += `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-date">📅 ${item.date}</span>
                    <div>
                        <span class="history-bmi">ИМТ: ${item.bmi}</span>
                        <span class="history-category" style="background: ${categoryColor}20; color: ${categoryColor}; margin-left: 10px;">${item.category}</span>
                    </div>
                    <button class="delete-history-btn" onclick="deleteHistoryItem(${item.id})">🗑 Удалить</button>
                </div>
                <div class="history-details">
                    📏 ${item.height} см | ⚖️ ${item.weight} кг | 🎂 ${item.age} лет | ${item.gender}
                </div>
            </div>
        `;
    });
    
    html += `<button class="clear-history-btn" onclick="clearAllHistory()">🗑 Очистить всю историю</button>`;
    historyList.innerHTML = html;
    personalAccount.classList.remove('hidden');
}

// Удаление одной записи
function deleteHistoryItem(id) {
    if (!currentUser) return;
    
    let history = JSON.parse(localStorage.getItem(`bmi_history_${currentUser.id}`)) || [];
    history = history.filter(item => item.id !== id);
    localStorage.setItem(`bmi_history_${currentUser.id}`, JSON.stringify(history));
    
    renderHistory();
}

// Очистка всей истории
function clearAllHistory() {
    if (!currentUser) return;
    
    if (confirm('❓ Вы уверены, что хотите удалить всю историю результатов?')) {
        localStorage.removeItem(`bmi_history_${currentUser.id}`);
        renderHistory();
    }
}

// Показать кнопку сохранения после расчёта ИМТ
function showSaveButton() {
    const saveBtn = document.getElementById('saveResultBtn');
    if (saveBtn) {
        saveBtn.classList.remove('hidden');
    }
}