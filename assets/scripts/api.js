const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd5fdcfe634msh79eaf7a87bc876cp13a8e2jsn9675026c3ad4',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
};

const fetchApi = {
    getExercises: () => {
        return fetch('https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(err => {
                console.error(err);
            });
    }
};

const searchExercises = document.querySelector('.search-content');

fetchApi.getExercises()
    .then(exercises => {
        const search = document.createElement('div');

        const inputSearch = document.createElement('input');
        inputSearch.classList.add('exerciseInput');
        inputSearch.type = 'text';
        inputSearch.placeholder = 'Search for an exercise';
        const button = document.createElement('button');
        button.classList.add('search-btn');
        button.textContent = 'Search';
        button.style.marginLeft = '.25rem'

        button.addEventListener('click', () => {
            const input = document.querySelector('.exerciseInput');

            // Handle the case where the user enters an empty search query
            if (input.value === '') {
                console.error('Please enter a search query');
                return; // Return early to exit the event listener callback
            }

            const exercise = exercises.find(exercise => exercise.name === input.value);
            if (exercise) {
                console.log(exercise);

                // Create a new div element to display the exercise data
                const exerciseData = document.createElement('div');
                exerciseData.classList.add('exercise-data');

                // Set the text content of the div element to the data of the exercise
                // Provide a default value for the muscles property in case it is undefined or empty
                exerciseData.textContent = `Name: ${exercise.name}
                                            \nDescription: ${exercise.instructions}
                                            \nMuscles: ${exercise.muscles ? exercise.muscles.join(', ') : 'N/A'}`;
                // Remove all child elements from the searchResults element
                while (searchResults.firstChild) {
                    searchResults.removeChild(searchResults.firstChild);
                }


                // Append the exerciseData element to the searchResults element
                searchResults.appendChild(exerciseData);
            } else {
                console.error('No matching exercise found');
            }
        });

        const searchResults = document.createElement('div');
        const resultP = document.createElement('p');
        searchResults.appendChild(resultP);

        search.appendChild(p);
        search.appendChild(inputSearch);
        search.appendChild(button);
        search.appendChild(searchResults);

        // Append the search element to the DOM
        searchExercises.appendChild(search);
    })
    .catch(error => {
        console.error(error);
        console.error('Failed to retrieve exercise data');
    });




const exerciseList = document.querySelector('.exercises');
const iconGym = new URL('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43aO4PA2lVEmTTNxwa8LrYALcGH6MOkaiRA&usqp=CAU');

const muscleIcons = {
    biceps: `https://cdn-icons-png.flaticon.com/512/6619/6619275.png`,
    quadriceps: `https://cdn-icons-png.flaticon.com/512/30/30627.png`,
    forearms: `https://uxwing.com/wp-content/themes/uxwing/download/fitness-gym-yoga-spa/arm-muscles-icon.png`,
    abdominals: `https://cdn-icons-png.flaticon.com/512/7118/7118257.png`,
    lats: `https://cdn-icons-png.flaticon.com/512/6583/6583971.png`,
    middle_back: `https://cdn-icons-png.flaticon.com/512/9049/9049487.png`,
    lower_back: `https://cdn.iconscout.com/icon/premium/png-256-thumb/back-pain-2-1046595.png`,
    shoulders: `https://cdn-icons-png.flaticon.com/512/2416/2416832.png`,
}

fetchApi.getExercises()
    .then(exercises => {
        const scroller = document.createElement('div');
        scroller.style = `
        overflow-x: scroll;
        overflow-y: hidden;
        scroll-bar-width: none;
        white-space: nowrap;
        `;

        document.body.appendChild(scroller);

        const addedMuscles = [];

        exercises.forEach(exercise => {
            // Verifica se o músculo atual já foi adicionado
            if (!addedMuscles.includes(exercise.muscle)) {
                addedMuscles.push(exercise.muscle);
                const container = document.createElement('div');
                container.style = `
                    grid-auto-flow: column;
                    grid-gap: 10px 10px;
                    align-items: center;
                    justify-items: center;
                    display: inline-grid;
                    `;
                const input = document.createElement('input');
                input.type = 'image';
                input.src = muscleIcons[exercise.muscle];
                input.alt = exercise.muscle;
                input.style = `
                    background-size: cover;
                    width: 60px;
                    height: 60px;
                    border: none;
                `;

                input.addEventListener('mouseenter', () => {
                    input.style = `
                        width: 100px;
                        height: 100px;
                        border: none;
                        border-top: .5rem solid #FF2625;
                        margin-bottom: .5rem;
                    `;
                });
                input.addEventListener('mouseleave', () => {
                    input.style = `
                        background-size: cover;
                        width: 60px;
                        height: 60px;
                        border: none;
                    `;
                });
                input.addEventListener('click', () => {
                    // Handle the button click here
                });
                const box = document.createElement('div');
                box.style = `
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-left: 1rem;
                    margin-right: 1rem;     
                    `;

                box.appendChild(input);
                container.appendChild(box);
                scroller.appendChild(container);

            }
        });

        exerciseList.appendChild(scroller);
    });