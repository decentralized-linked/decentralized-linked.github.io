let myName = ''

function start() {
    initMyProfile()
    initMessages()
    initPeopleFollow()
}

function initMyProfile() {
    let profileContent = ''
    if(localStorage.myProfile === undefined) {
        initDummyProfile()
    } else {
        let myProfile = JSON.parse(localStorage.myProfile)
        myName = myProfile.name
        profileContent += `
            Name: <span id="my-name">${myProfile.name}</span> <br/>
            Occupation: <span id="my-occupation">${myProfile.occupation}</span> <br/>
            Bio: <span id="my-bio">${myProfile.bio}</span> <br/>
            <button id="set-profile-button" class="align-center" onclick="setProfile()">Set Profile</button>`
        document.querySelector('#profile-content').innerHTML = profileContent
    }
}

function setProfile() {
    let profileContent = `Name: <input type="text" id="set-profile-name" placeholder="Type your name..."/> <br/><br/>
        Occupation: <input type="text" id="set-profile-occupation" placeholder="Type your occupation..."/> <br/><br/>
        Bio: <input type="text" id="set-profile-bio" placeholder="Type your bio..."/> <br/><br/>
        <button onclick="saveSetProfile(
            document.querySelector('#set-profile-name').value,
            document.querySelector('#set-profile-occupation').value,
            document.querySelector('#set-profile-bio').value
        )">Save Changes</button>
        <button onclick="cancelSetProfile()">Cancel Changes</button>`

    document.querySelector('#profile-content').innerHTML = profileContent
}

function saveSetProfile(name, occupation, bio) {
    localStorage.myProfile = JSON.stringify({
        name: name,
        occupation: occupation,
        bio: bio
    })
    initMyProfile()
}

function cancelSetProfile() {
    start()
}

function initDummyPeopleToFollow() {
    let users = [
        {
            name: "John",
            occupation: "Web App Developer",
            bio: "Suspendisse tempus, felis non convallis elementum, lectus urna eleifend augue, quis tristique felis ante sit amet elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
            isFollowing: false
        }, {
            name: "Jessica",
            occupation: "Graphic Designer",
            bio: "Quisque sapien mauris, rhoncus quis odio sed, ultrices molestie massa. Sed eu lorem quis velit egestas lobortis. In aliquam mauris eros, id varius turpis sagittis et.",
            isFollowing: true
        }, {
            name: "Veronica",
            occupation: "Blockchain Developer",
            bio: "Aenean egestas at tellus tempor faucibus. Morbi mattis metus in ex malesuada, faucibus eleifend ante interdum.",
            isFollowing: false
        }, {
            name: "Randy",
            occupation: "Youtuber",
            bio: "Phasellus nibh massa, sagittis nec odio sit amet, porttitor vestibulum urna. Nam lorem justo, pretium et nisl ac, ullamcorper tempus leo.",
            isFollowing: false
        }, {
            name: "Rick",
            occupation: "Backend Developer",
            bio: "Curabitur eros ante, tempor sit amet sagittis ac, tincidunt quis quam. Aenean vitae diam sodales, maximus dolor at, posuere odio. Phasellus id tortor faucibus, sagittis leo a, egestas metus.",
            isFollowing: true
        }
    ]
    localStorage.users = JSON.stringify(users)
}

function initPeopleFollow() {
    if(localStorage.users === undefined) initDummyPeopleToFollow()

    let users = JSON.parse(localStorage.users)
    let sectionContent = ''
    for(let i = 0; i < users.length; i++) {
        sectionContent += `<div id="people-to-follow-${i}" class="user-box">
            Name: <span>${users[i].name}</span> <br/>
            Occupation: <span>${users[i].occupation}</span> <br/>
            Bio: <span>${users[i].bio}</span> <br/>
            ${users[i].isFollowing ? `<button class="following-button" onclick="unfollowUser(${i})">Following</button>` : `<button onclick="followUser(${i})">Follow</button>`}
        </div>`
    }
    document.querySelector('#people-to-follow').innerHTML = sectionContent
}

function unfollowUser(id) {
    let users = JSON.parse(localStorage.users)
    users[id].isFollowing = false
    localStorage.users = JSON.stringify(users)
    initPeopleFollow()
}

function followUser(id) {
    let users = JSON.parse(localStorage.users)
    users[id].isFollowing = true
    localStorage.users = JSON.stringify(users)
    initPeopleFollow()
}

function sendMessage(message) {
    let messages = JSON.parse(localStorage.messages)
    messages.push({
        writtenBy: myName,
        content: message
    })
    localStorage.messages = JSON.stringify(messages)
    initMessages()
}

function initMessages() {
    if(localStorage.messages === undefined) initDummyMessages()

    let messages = JSON.parse(localStorage.messages)
    let sectionContent = ''
    for(let i = 0; i < messages.length; i++) {
        sectionContent += `<div class="message-box">
            <div>${messages[i].writtenBy} says:</div>
            <div>${messages[i].content}</div>
        </div>`
    }
    document.querySelector('#messages').innerHTML = sectionContent

}

function initDummyMessages() {
    let messages = [
        {
            content: "Proin tortor erat, sodales id bibendum at, semper at nibh. Quisque eu mattis enim. Donec dictum dui massa, non placerat lorem interdum eu.",
            writtenBy: "Jessica"
        }, {
            content: "Integer porttitor vel magna in sagittis. Integer suscipit tristique scelerisque. Sed condimentum sit amet mi a rhoncus.",
            writtenBy: "Veronica"
        }, {
            content: "In hac habitasse platea dictumst. Curabitur et nunc ultrices, interdum ligula nec, dignissim augue. Praesent varius nunc enim, ac efficitur augue hendrerit et.",
            writtenBy: "Rick"
        }, {
            content: "Mauris aliquet odio libero, vel aliquet est aliquam a. Duis vitae urna vitae massa ultrices tempor. Curabitur lacus massa, congue quis sagittis eu, consectetur non nisi. Proin id quam felis.",
            writtenBy: "Jessica"
        }, {
            content: "Curabitur dapibus est luctus, suscipit libero vel, euismod ex. Suspendisse id purus eu urna finibus rutrum.",
            writtenBy: "John"
        }
    ]
    localStorage.messages = JSON.stringify(messages)
}

function initDummyProfile() {
    localStorage.myProfile = JSON.stringify({
        name: "Anonymous",
        occupation: "Beep",
        bio: "I'm just a bot"
    })
    initMyProfile()
}

start()
