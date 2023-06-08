import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import {
  CinemaItem,
  changeCurrentArea,
  changeCurrentCinema,
  addMovies,
} from "../../redux/slices/Main";
import { RootState } from "../../redux/store";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { SiCinema4D } from "react-icons/si";

import { CiCircleRemove } from "react-icons/ci";
import {
  GetMovie,
  Movie,
  useAddCinemaMutation,
  useAddMovieMutation,
  useAddMovieToCinemaMutation,
  useDeleteMovieFromCinemaMutation,
  useGetAllMoviesQuery,
  useGetCinemaByAreaQuery,
  useGetMoviesByCinemaQuery,
} from "../../redux/slices/MainApi";
import { Link } from "react-router-dom";

const Cinemas: React.FC = () => {
  const dispach = useDispatch();

  const currentArea = useSelector((state: RootState) => state.main.currentArea);
  const currentCinemas = useSelector(
    (state: RootState) => state.main.currentCinema
  );
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);

  const modal = useRef<HTMLDivElement>(null);

  const areas = [
    "Суворовський район",
    "Київський район",
    "Приморський район",
    "Малиновський район",
  ];

  const { data, error, isLoading, refetch } = useGetCinemaByAreaQuery(
    areas[currentArea]
  );
  const [inputData, setInputData] = useState({
    hours: "",
    minuts: "",
    name: "",
    producer: "",
    operator: "",
    actors: "",
    year: "",
    genre: "",
    production: "",
    duration: "",
    image: "",
    bio: "",
  });
  useEffect(() => {
    refetch();
  }, [currentCinemas]);

  const [addMovie, addMovieResult] = useAddMovieMutation();

  const handleShow = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShow(true);
  };

  const inputControl = (e: any) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
      duration: `${inputData.hours}:${inputData.minuts}`,
    });
  };
  const handleClose = () => setShow(false);
  const addMovies2 = (obj: Movie) => {
    dispach(addMovies(obj));
    addMovie(obj);
    setShow(false);
  };
  return (
    <>
      <div className="cinemas">
        <Link to={"/"} className="cinemaLogo">
          <SiCinema4D />
        </Link>

        <div className="cinemaItem">
          <p className="cinemaItemName">
            {currentCinemas.name.length > 1
              ? currentCinemas.name
              : "Виберіть кінотеатр"}
          </p>
          <div>
            <TfiArrowCircleDown
              onClick={() =>
                modal.current !== null &&
                modal.current.classList.add("showModal")
              }
              fill="white"
              fontSize={30}
              className="cinemaItemSvg"
            />
          </div>
        </div>
      </div>
      <div className="cinemasModal" ref={modal}>
        <Button
          variant="danger"
          size="lg"
          className="cinemasAdd"
          onClick={(e) => handleShow(e)}
        >
          Додати фільм
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Button
          variant="danger"
          size="lg"
          className="cinemasBtn"
          onClick={() => setModalShow(true)}
        >
          Додати фільм до кінотеатру
        </Button>
        <MyVerticallyCenteredModal2
          show={modalShow2}
          onHide={() => setModalShow2(false)}
        />
        <Button
          variant="danger"
          size="lg"
          className="cinemasAddBtn"
          onClick={() => setModalShow2(true)}
        >
          Додати кінотеатр
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Додати фільм</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Назва</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  name="name"
                  value={inputData.name}
                  onChange={inputControl}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Жанр</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  name="genre"
                  value={inputData.genre}
                  onChange={inputControl}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Рік</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  name="year"
                  value={inputData.year}
                  onChange={inputControl}
                />
              </Form.Group>
              <InputGroup className="mb-3">
                <InputGroup.Text>Тривалість</InputGroup.Text>
                <Form.Control
                  aria-label="First name"
                  placeholder="Час"
                  type="number"
                  name="hours"
                  onChange={inputControl}
                />
                <Form.Control
                  aria-label="Last name"
                  type="number"
                  placeholder="Хвилини"
                  name="minuts"
                  onChange={inputControl}
                />
              </InputGroup>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Режисер</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  name="producer"
                  onChange={inputControl}
                  value={inputData.producer}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Оператор</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  name="operator"
                  onChange={inputControl}
                  value={inputData.operator}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Виробництво</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  onChange={inputControl}
                  name="production"
                  value={inputData.production}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Акторы</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  name="actors"
                  onChange={inputControl}
                  value={inputData.actors}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Посилання на зображення</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  placeholder="URL"
                  name="image"
                  onChange={inputControl}
                  value={inputData.image}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Опыс фільму</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={inputControl}
                  name="bio"
                  value={inputData.bio}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => addMovies2(inputData)}>
              Додати
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Вийти
            </Button>
          </Modal.Footer>
        </Modal>

        <CiCircleRemove
          fill="black"
          onClick={() => modal.current?.classList.remove("showModal")}
          className="cinemasModalSvg"
          fontSize={50}
        />
        <div className="cinemasAreas">
          <p>Район:</p>
          <hr />
          {areas.map((v, i) => {
            return (
              <p
                key={i}
                className={currentArea == i ? "activeArea" : ""}
                onClick={(e) => dispach(changeCurrentArea(i))}
              >
                {v}
              </p>
            );
          })}
        </div>
        <div className="cinemasItems">
          <p>Кінотеатр:</p>
          <hr />
          {data &&
            data.map((v: CinemaItem, i: number) => {
              return (
                <p
                  key={i}
                  onClick={(e) => {
                    dispach(changeCurrentCinema(v));
                    modal.current?.classList.remove("showModal");
                  }}
                  className={currentCinemas.name == v.name ? "activeArea" : ""}
                >
                  {v.name}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
};

function MyVerticallyCenteredModal(props: any) {
  const [searchValue, setSearchValue] = useState("");
  const [addMovieByCinema, addMovieResultByCinema] =
    useAddMovieToCinemaMutation();
  const [deleteMovieFromCinema] = useDeleteMovieFromCinemaMutation();
  const currentCinemas = useSelector(
    (state: RootState) => state.main.currentCinema
  );
  const { data: movies } = useGetAllMoviesQuery();
  const addMovieToCinema2 = (obj: GetMovie) => {
    addMovieByCinema(obj);
  };
  const inputControll = (e: any) => {
    setSearchValue(e.target.value);
  };
  console.log(searchValue);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Назва</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              autoFocus
              name="name"
              value={searchValue}
              onChange={inputControll}
            />
          </Form.Group>
        </Form>
        <div className="modalMovieCards">
          {movies &&
            movies
              .filter((i: Movie) => i.name.includes(searchValue))
              .map((cur: Movie, index: number) => {
                let obj = {
                  cinemaId: currentCinemas._id,
                  movieId: cur._id as string,
                };
                return (
                  <div className="modalMovieCard" key={index as number}>
                    <div
                      className="modalMovieCardImg"
                      style={{
                        backgroundImage: `url(${cur.image})`,
                      }}
                    ></div>
                    <div className="modalMovieCardInfo">
                      <p>{cur.name}</p>
                      <p>{cur.year}</p>
                      <p>{cur.genre}</p>
                      <Button
                        variant="success"
                        onClick={() => addMovieToCinema2(obj)}
                      >
                        Додати
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteMovieFromCinema(obj)}
                      >
                        Видалити
                      </Button>{" "}
                    </div>
                  </div>
                );
              })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal2(props: any) {
  const [searchValue, setSearchValue] = useState({
    name: "",
    area: "",
    category: "",
    intesity: 0,
  });
  const [addCinema] = useAddCinemaMutation();
  const inputControll = (e: any) => {
    setSearchValue({
      ...searchValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleAdd = () => {
    addCinema(searchValue);
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Назва</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              autoFocus
              name="name"
              value={searchValue.name}
              onChange={inputControll}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Район</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              autoFocus
              name="area"
              value={searchValue.area}
              onChange={inputControll}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Категорія</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              autoFocus
              name="category"
              value={searchValue.category}
              onChange={inputControll}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Місткість</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              autoFocus
              name="intesity"
              value={searchValue.intesity}
              onChange={inputControll}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="primary" onClick={handleAdd}>
          Додати
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cinemas;
