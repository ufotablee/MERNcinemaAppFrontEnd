import React, { useState } from "react";
import SessionItem from "../SessionItem";
import { useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import add from "date-fns/add";
import {
  useAddSessionMutation,
  useGetSessionsByMovieIDQuery,
} from "../../redux/slices/MainApi";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";
import { RootState } from "../../redux/store";
const Sessions = ({ id, movieData }: any) => {
  const { data } = useGetSessionsByMovieIDQuery(id as string);

  const currentCinema = useSelector(
    (state: RootState) => state.main.currentCinema._id
  );
  const [modalShow, setModalShow] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState(format(new Date(), "P"));
  const data2 = format(new Date(), "EEE, d MMMM", { locale: uk });

  const isToday2 = isToday(new Date()) ? "Сьогодні" : "";
  const finalData = data2 + " " + isToday2;
  const tomomorrow = add(new Date(), {
    days: 1,
  });
  const tommorrow = format(tomomorrow, "EEE, d MMMM", { locale: uk });
  const isTommorrow2 = isTomorrow(tomomorrow) ? "Завтра" : "";
  const finalTommorrow = tommorrow + " " + isTommorrow2;

  const afterTommorrow2 = add(tomomorrow, {
    days: 1,
  });
  const afterTommorrow = format(afterTommorrow2, "EEE, d MMMM", { locale: uk });

  const selectHandler = (e: any) => {
    setSelectValue(e.target.value);
  };

  return (
    <div className="sessions">
      <div className="headerSessions">
        <p>Розклад сеансів</p>
        <div>
          <Form.Select
            aria-label="Default select example"
            onChange={selectHandler}
          >
            <option value={format(new Date(), "P")}>{finalData}</option>
            <option value={format(tomomorrow, "P")}>{finalTommorrow}</option>
            <option value={format(afterTommorrow2, "P")}>
              {afterTommorrow}
            </option>
          </Form.Select>
        </div>
      </div>
      <div className="footerSessions">
        {data &&
          data.map((c: any, index: number) => {
            return (
              <SessionItem
                data={c}
                capture={true}
                key={index}
                selectValue={selectValue}
                movieData={movieData}
              />
            );
          })}
      </div>
      <div className="sessionBtnContainer">
        <Button
          variant="secondary"
          className="sessionBtn"
          onClick={() => setModalShow(true)}
        >
          Додати сеанс
        </Button>{" "}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
  function MyVerticallyCenteredModal(props: any) {
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState({
      data: "",
      time: "",
      good: 0,
      lux: 0,
    });
    const [addSession, addSessionResult] = useAddSessionMutation();
    registerLocale("ua", uk);
    const formatDate = (data: Date) => {
      setStartDate(data);
      const newDate = format(data, "Pp");
      setDate({
        ...date,
        data: newDate.split(",")[0],
        time: newDate.split(",")[1],
      });
    };

    const addSessionHandler = () => {
      addSession({
        cinemaId: currentCinema,
        movieId: id,
        data: date.data,
        time: date.time,
        good: date.good,
        lux: date.lux,
      });
      props.onHide();
    };
    console.log(date);
    const inputControl = (e: any) => {
      setDate({
        ...date,
        [e.target.name]: e.target.value,
      });
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Додати сеанс
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Дата та час</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => formatDate(date)}
                showTimeSelect
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputGroup className="mb-3">
                <InputGroup.Text>Ціна</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Звичайне місце"
                  name="good"
                  onChange={inputControl}
                />
                <Form.Control
                  type="number"
                  placeholder="Lux місце"
                  name="lux"
                  onChange={inputControl}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addSessionHandler()}>Додати</Button>
          <Button onClick={props.onHide}>Закрити</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default Sessions;
