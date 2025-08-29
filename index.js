const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Server is running!');
});
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        const full_name = "Madhuvanthi Subramanian";
        const dob = "16062004";             
        const email = "madhuvanthis2004@gmail.com";
        const roll_number = "22BIT0103";
        const user_id = `${full_name.toLowerCase()}_${dob}`;
        let odd_numbers = [];
        let even_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let all_alpha_chars_string = "";
        data.forEach(item => {
            if (!isNaN(item)) {
                sum += Number(item);
                if (Number(item) % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            }
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase()); 
                all_alpha_chars_string += item;
            }
            else {
                special_characters.push(item);
            }
        });
        const reversed_alpha_string = all_alpha_chars_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alpha_string.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alpha_string[i].toUpperCase();
            } else {
                concat_string += reversed_alpha_string[i].toLowerCase();
            }
        }
        const response = {
            "is_success": true, 
            "user_id": user_id, 
            "email": email, 
            "roll_number": roll_number, 
            "odd_numbers": odd_numbers, 
            "even_numbers": even_numbers, 
            "alphabets": alphabets, 
            "special_characters": special_characters, 
            "sum": String(sum), 
            "concat_string": concat_string 
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            "is_success": false,
            "error_message": error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});