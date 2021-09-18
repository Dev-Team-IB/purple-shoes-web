import React from 'react';

const About = () => {
    return (
        <div className="App">
            <button type="button" onClick={() => {
                fetch('http://localhost:5000/test')
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        alert(data.message);
                    });
            }}>get data</button>
        </div>
    );
};

export default About;