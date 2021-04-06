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
              src="https://images.pexels.com/photos/1725330/pexels-photo-1725330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="First slide"
              style={{
                maxHeight: 550,
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Promote</h5>
              <p>Sentence About Promoting things</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/240040/pexels-photo-240040.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Second slide"
              style={{
                maxHeight: 550,
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Preserve</h5>
              <p>Sentence About Preserving things</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/6510280/pexels-photo-6510280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Third slide"
              style={{
                maxHeight: 550,
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Protect</h5>
              <p>Sentence About Protecting things</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <h3>Our Mission</h3>
      <p>
        I'm baby iceland tote bag pork belly roof party occupy iPhone biodiesel.
        Bitters raclette portland freegan, coloring book intelligentsia
        pinterest paleo tattooed VHS narwhal chartreuse. Cray waistcoat hammock
        typewriter offal taxidermy brooklyn ethical shabby chic. Normcore raw
        denim unicorn occupy tbh blog la croix pork belly readymade vice. Food
        truck yr gochujang pabst four dollar toast skateboard bushwick DIY meh
        man braid. La croix butcher four loko, umami tousled hot chicken
        letterpress vexillologist sustainable hexagon prism aesthetic you
        probably haven't heard of them narwhal. 90's occupy intelligentsia
        forage pok pok, fashion axe subway tile you probably haven't heard of
        them brooklyn raclette XOXO cloud bread retro. Copper mug stumptown
        cronut man braid seitan subway tile. Messenger bag mustache normcore,
        next level selvage hashtag schlitz sustainable umami small batch offal
        listicle truffaut yuccie lo-fi. Kinfolk whatever woke wolf marfa pickled
        meh franzen cred fingerstache godard. Forage everyday carry crucifix man
        braid chambray activated charcoal tofu enamel pin locavore actually
        pop-up. Chartreuse cornhole shoreditch umami hexagon cray pabst chambray
        raw denim adaptogen stumptown copper mug. Pickled ethical 8-bit unicorn
        shabby chic vice waistcoat woke, sartorial glossier hella craft beer
        synth. Pitchfork keffiyeh letterpress, next level woke lomo kickstarter
        man bun. Yuccie gastropub cardigan skateboard kickstarter lyft. Copper
        mug +1 photo booth shoreditch activated charcoal ramps gluten-free
        pop-up yuccie hexagon 90's freegan food truck celiac. Distillery
        activated charcoal four loko thundercats hammock beard dreamcatcher fam
        master cleanse cliche palo santo gentrify.
      </p>
      <div className="card" style={{width: 10 + 'rem'}}>
        <img
          className="card-img-top"
          src="https://media-exp1.licdn.com/dms/image/C5635AQGI2fxOcoTuZA/profile-framedphoto-shrink_800_800/0/1615845578261?e=1617764400&v=beta&t=iVwstSk5pBvPf9E9tJLijTBFl0S2ZZh9iQReojEuEaY"
          alt="Card image cap"
        />
        <div className="card-body">
          <Button
            size="small"
            color="primary"
            href="https://www.linkedin.com/in/katelyndevinekd/"
          >
            <LinkedInIcon />
          </Button>
          <Button
            size="small"
            color="primary"
            href="https://github.com/katelyndevine"
          >
            <GitHubIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
