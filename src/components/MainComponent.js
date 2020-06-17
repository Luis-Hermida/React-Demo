import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { actions } from "react-redux-form";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import CardMenuComponent from "./CardMenuComponent";
import DishDetailComponent from "./DishdetailComponent";
import Contact from "./ContactComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const DishWithId = ({ match }) => {
      return (
        <DishDetailComponent
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          err={this.props.dishes.err}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          postComment={this.props.postComment}
          commentsErr={this.props.comments.err}
        />
      );
    };

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErr={this.props.dishes.err}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErr={this.props.promotions.err}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErr={this.props.leaders.err}
        />
      );
    };

    const AboutPage = () => {
      return (
        <About
          leader={this.props.leaders.leaders}
          leaderLoading={this.props.leaders.isLoading}
          leaderErr={this.props.leaders.err}
        />
      );
    };

    const ContactUsPage = () => {
      return (
        <Contact
          resetFeedbackForm={this.props.resetFeedbackForm}
          postFeedback={this.props.postFeedback}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="alert"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route path="/about" component={() => <AboutPage />} />
              <Route
                exact
                path="/menu"
                component={() => (
                  <CardMenuComponent dishes={this.props.dishes} />
                )}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route path="/contact" component={ContactUsPage} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
