"use strict";

$(document).ready(function(){
    $('#convert').click(function() {
        const input = $('#coordenates').val().trim();
        if (input) {
            const values = input.split(',');
            buildResultTable(values);
        } else {
            alert('Por favor, digite um valor.');
        }
    });
});

function convert(input) {
    const words = input.split(',');
    let result = '';
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const decimal = convertToDecimal(word);
        result += decimal + ', ';
    }
    return result;
}

function convertToDecimal(coordinate) {
    const { direction, degrees, minutes, seconds } = parseCoordinates(coordinate);

    if (!direction || degrees === null || minutes === null || seconds === null) {
        return "Coodenata inválida";
    }

    let decimal = degrees + minutes / 60 + seconds / 3600;

    if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
    }

    return decimal;
}

function parseCoordinates(input) {
    const regex = /([NSWE])?(\d+)°(\d+)'(\d+)"/;
    const match = input.match(regex);

    if (match) {
        const direction = match[1] || null;
        const degrees = match[2] ? parseInt(match[2], 10) : 0;
        const minutes = match[3] ? parseInt(match[3], 10) : 0;
        const seconds = match[4] ? parseInt(match[4], 10) : 0;

        return { direction, degrees, minutes, seconds };
    } else {
        return null;
    }
}

function buildResultTable(values) {
    $('#result-table tbody').empty();

    values.forEach(coord => {
        const decimal = convertToDecimal(coord.trim());

        const isValid = decimal !== null && decimal !== "Coordenada inválida";

        const row = $('<tr>').append(
            $('<td>').text(coord.trim()),
            $('<td>').html(isValid ? decimal : "<span style='color:red;'>Coordenada inválida!</span>")
        );

        $('#result-table tbody').append(row);
    });

    $('.results-container').fadeIn();
}