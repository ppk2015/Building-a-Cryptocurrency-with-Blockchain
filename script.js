// script.js

const API_URL = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', () => {
    updateChain();
    document.getElementById('transactionForm').addEventListener('submit', submitTransaction);
    document.getElementById('mineButton').addEventListener('click', mineBlock);
});

function updateChain() {
    fetch(`${API_URL}/chain`)
        .then(response => response.json())
        .then(data => {
            const chainElement = document.getElementById('chain');
            chainElement.innerHTML = '';
            data.chain.forEach(block => {
                const blockElement = document.createElement('div');
                blockElement.classList.add('block');
                blockElement.innerHTML = `
                    <p>Block Index: ${block.index}</p>
                    <p>Proof: ${block.proof}</p>
                    <p>Previous Hash: ${block.previous_hash}</p>
                    <p>Transactions: ${JSON.stringify(block.transactions)}</p>
                `;
                chainElement.appendChild(blockElement);
            });
        });
}

function submitTransaction(event) {
    event.preventDefault();
    const sender = document.getElementById('sender').value;
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    fetch(`${API_URL}/transactions/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender, recipient, amount })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        updateChain();
    });
}

function mineBlock() {
    fetch(`${API_URL}/mine`)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            updateChain();
        });
}
