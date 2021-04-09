import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import {Button} from '@material-ui/core'

export const AboutPage = () => {
  return (
    <div>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1597347263549-9e3762679eff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="First slide"
              style={{
                maxHeight: 550,
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Promote</h5>
              <p>Promoting the speaking and learning of Indigenous languages</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1599575239832-9a211999a97a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
              alt="Second slide"
              style={{
                maxHeight: 550,
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Preserve</h5>
              <p>
                Preserving and acknowledging Indigenous histories and cultures
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/129539/pexels-photo-129539.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="Third slide"
              style={{
                maxHeight: 550,
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Protect</h5>
              <p>Protecting endangered languages from going extinct</p>
            </div>
          </div>
        </div>
      </div>
      <div className="AboutText">
        <h3>Our Mission</h3>
        <p>
          Inspired by <a href="https://native-land.ca/">Native-Land.ca</a>, our
          mission is to promote, preserve, and protect Indigenous languages,
          histories, and cultures. Rooted provides materials and resources to
          aid people looking to acknowledge the Indigenous peoples on whose land
          they are on, and language-learning resources for those who want to add
          to the local community of Indigenous language speakers.
          <br />
          <br />
          We recognize that our data and information is currently incomplete,
          and we’re striving to create more interactive, accurate, and
          accessible resources. If you find that anything on our site is
          inaccurate we encourage you to reach out to us through the chat
          feature on the bottom right of our website.
          <br />
          <br />
          For more information about rooted, check out our walkthrough <a href='https://www.youtube.com/watch?v=aaQ5PhoRqi4&list=PLx0iOsdUOUmlMC7sg4I52zvrLczgQqiFv&index=17'>video.</a>
        </p>
        <h3>Upcoming Features:</h3>
        <p><em>
          rooted is currently in development, we hope to add more functionality including:
           </em> </p>
        <ul className='AboutText'>
          <li>Land acknowledgment prompts based on territory</li>
          <li>Currently, we have over 200 clickable language map features and are constantly expanding interactivity</li>
          <li>User-to-user interaction through chat and a community calendar</li>
          <li>Additional data visualization</li>
          <li>Expanded learning support for more Indigenous languages</li>
          <li>Audio for language-learning</li>
        </ul>
        <h3>Our Team</h3>
      </div>
      <div className="AboutCards">
        <div class="card-deck">
          <div className="card border-white" style={{width: 11 + 'rem'}}>
            <img
              className="rounded-circle"
              src="https://avatars.githubusercontent.com/u/66745009?v=4"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5>Katelyn</h5>
              <Button
                size="default"
                color="primary"
                href="https://www.linkedin.com/in/katelyndevinekd/"
              >
                <LinkedInIcon />
              </Button>
              <Button
                size="default"
                color="primary"
                href="https://github.com/katelyndevine"
              >
                <GitHubIcon />
              </Button>
            </div>
          </div>
          <div className="card border-white" style={{width: 11 + 'rem'}}>
            <img
              className="rounded-circle"
              src="https://media-exp1.licdn.com/dms/image/C4D03AQGUs3MvHS7VTA/profile-displayphoto-shrink_800_800/0/1610827922354?e=1623283200&v=beta&t=3uRddZbLb-Kdz4lmj383CxA7-ZuLLaAJLiWJ0XxmoX4"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5>John</h5>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/johnrmccray/"
              >
                <LinkedInIcon />
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://github.com/mccrayjr"
              >
                <GitHubIcon />
              </Button>
            </div>
          </div>
          <div className="card border-white" style={{width: 11 + 'rem'}}>
            <img
              className="rounded-circle"
              src="https://avatars.githubusercontent.com/u/71110821?v=4"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5>Kendall</h5>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/kmoraski/"
              >
                <LinkedInIcon />
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://github.com/kendimoraski"
              >
                <GitHubIcon />
              </Button>
            </div>
          </div>
          <div className="card border-white" style={{width: 11 + 'rem'}}>
            <img
              className="rounded-circle"
              src="https://media-exp1.licdn.com/dms/image/C5603AQFxpEpPdJMOxA/profile-displayphoto-shrink_200_200/0/1603244088701?e=1623283200&v=beta&t=QhBRLWha5tmQZ1FU7-N8gkaa5tVXMZeR00AtqY2ROWs"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5>Elijah</h5>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/elijahsciam/"
              >
                <LinkedInIcon />
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://github.com/orgs/the-bat-signal/people/elijahsciam"
              >
                <GitHubIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
