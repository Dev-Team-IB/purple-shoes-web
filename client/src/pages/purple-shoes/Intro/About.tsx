const About = () => {
    return(
        <div>
            <h2>대충 about 이라는 뜻.</h2>
            <button type="button" onClick={() => {
                fetch('https://purple-shoes.herokuapp.com/test')
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        alert(data.message);
                    });
            }}>get data</button>
        </div>
    )
}
export default About;