const tickets = [
    { title: 'Проектор не включается', room: '203', category: 'Оборудование', done: false, },
    { title: 'Не закрывается окно', room: '105', category: 'Аудитория', done: false, },
    { title: 'В коридоре не горит свет', room: 'Коридор, 2-й этаж', category: 'Другое', done: true, },
]

const inpProblem = document.getElementById('InpProblem')
const problemError = document.getElementById('ProblemError')
const inpRoom = document.getElementById('InpRoom')
const roomError = document.getElementById('RoomError')


const category = document.getElementById('Category')

const addTicketBtn = document.getElementById('AddTicketBtn')

const ticketUL = document.getElementById('TicketUL')

function renderTicket() {
    ticketUL.innerHTML = '';

    tickets.forEach((ticket, index) => {
        const element = document.createElement('li')
        element.className = 'itemTicket';

        const divTicket = document.createElement('div');
        divTicket.className = 'divTicket';

        const problemEl = document.createElement('p');
        problemEl.className = 'titles';
        problemEl.textContent = `Проблема: ${ticket.title}`;

        const roomEl = document.createElement('p');
        roomEl.className = 'roomEl';
        roomEl.textContent = `Кабинет: ${ticket.room}`;

        const categoryEl = document.createElement('p');
        categoryEl.className = 'categoryEl';
        categoryEl.textContent = ticket.category;

        const doneEl = document.createElement('p');
        doneEl.className = 'doneEl';
        if (ticket.done == true) {
            doneEl.textContent = ` Статус: Выполнена`;
        }
        else if (ticket.done == false) {
            doneEl.textContent = ` Статус: Открыта`;
        }


        const executeBtn = createBtn('Выполнить', 'completeBtn', () => {
            executeTicket(index);
        });

        const deleteTicketBtn = createBtn('Удалить', 'deleteTicketBtn', () => {
            deleteTicket(index);
        });

        divTicket.append(problemEl, roomEl, categoryEl, doneEl);

        if (ticket.done == true) {
            element.append(divTicket, deleteTicketBtn);
        }
        else {
            element.append(divTicket, executeBtn, deleteTicketBtn);
        }

        ticketUL.append(element);
    }
    )
}

function NewTicket() {
    const problemVal = inpProblem.value.trim();
    const roomVal = inpRoom.value.trim();
    const categoryVal = category.value;

    problemError.textContent = '';
    roomError.textContent = '';

    if (problemVal === '') {
        problemError.textContent = 'Поле ввода проблемы не должно быть пустым';
        return;
    }
    
    if (roomVal === '') {
        roomError.textContent = 'Поле ввода комнаты не должно быть пустым';
        return;
    }

    if (category.selectedIndex === 0) {
        alert('Выберите категорию'); 
        return;
    }

    tickets.push({
        title: problemVal,
        room: roomVal,
        category: categoryVal,
        done: false,
    });

    renderTicket();

    inpProblem.value = '';
    inpRoom.value = '';
    category.selectedIndex = 0;
}


function createBtn(text, className, click) {
    const btn = document.createElement('button');
    btn.className = className;
    btn.textContent = text;
    btn.addEventListener('click', click);
    return btn;
}

function deleteTicket(index) {
    tickets.splice(index, 1);
    renderTicket();
}

function executeTicket(index) {
    tickets[index].done = true;
    renderTicket();
}

renderTicket();
addTicketBtn.addEventListener('click', NewTicket);