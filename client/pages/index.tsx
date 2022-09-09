import type { NextPage } from "next";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Spacer,
  Button,
  Text,
  useInput,
  Modal,
  Card,
} from "@nextui-org/react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { AiFillFileText } from "react-icons/ai";
import styles from "../styles/Home.module.css";
import axios from "axios";

const Home: NextPage = () => {
  // -- Validierung des Input Feldes (NextUI) --
  const { value, bindings } = useInput("");

  const validateIP = (value: string) => {
    return value.match(/[0-9]{3}\.[0-9]{2}\.[0-9]{2}\.[0-9]{3}:[0-9]{2}$/);
  };

  const helper = useMemo(() => {
    if (!value) return { text: "", color: "" };
    const isValid = validateIP(value);
    return {
      text: isValid ? "Correct IP" : "Enter a valid IP",
      color: isValid ? "success" : "error",
    };
  }, [value]);
  // -- Validierung des Input Feldes (NextUI) --

  // -- Modal (NextUI) --
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => setVisible(false);
  // -- Modal (NextUI) --

  const uploadToClient = (e: any) => {
    let url = "https://localhost:5000/restapi/upload";
    let file = e.target.files[0];
    uploadToServer(url, file);
  };

  const uploadToServer = (url: string, file: string | Blob) => {
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.error({ err });
      });
  };

  // -- react-dropzone_api --
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    useFsAccessApi: false,
    accept: {
      "text/cer": [".cer"],
    },
  });
  // -- react-dropzone_api --

  return (
    <Container>
      <Row justify="center">
        <Col>
          <Spacer y={10} />
          {/* FIXME: it works, but muss be fixed */}
          <Input
            {...bindings}
            clearable
            status={helper.color}
            color={helper.color}
            helperColor={helper.color}
            helperText={helper.text}
            placeholder="e.g.) 000.00.00.000:00"
            width="300px"
          />
          <Spacer y={0.5} />
          <Row align="flex-start">
            <Card css={{ mw: "450px", mr: "$10", p: "$5" }}>
              <Card.Body css={{ p: "$0" }}>
                <Text color="warning">
                  {acceptedFiles[0] == null ? (
                    <>no file selected</>
                  ) : (
                    <>
                      {acceptedFiles.map((file: FileWithPath) => (
                        <li key={file.path} className={styles.fileList}>
                          <AiFillFileText />
                          {file.path}
                        </li>
                      ))}
                    </>
                  )}
                </Text>
              </Card.Body>
            </Card>
            <Button
              aria-label="select"
              color="warning"
              auto
              onClick={openModal}
            >
              Select
            </Button>
          </Row>
          <Modal
            width="600px"
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeModal}
          >
            <Modal.Header>
              <Text h1 id="modal-title" size={24}>
                Drag and Drop File Upload
              </Text>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.droparea}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button
                    className={styles.selectBtn}
                    aria-label="select a file"
                    onClick={open}
                    // onChange={uploadToClient} ??
                    onChange={(e) => uploadToClient(e)}
                  >
                    select 1 File
                  </button>
                  <h3 className={styles.uploadMessage}>
                    or drag &amp; drop your file here
                  </h3>
                </div>
                <div>
                  <ul>
                    {acceptedFiles.map((file: FileWithPath) => (
                      <li key={file.path} className={styles.fileList}>
                        <AiFillFileText />
                        {file.path}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer justify="center">
              <Button
                aria-label="upload"
                color="primary"
                ghost
                onClick={closeModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Spacer y={1.5} />
          <Row justify="center">
            {/* FIXME: */}
            {validateIP(value) && acceptedFiles[0] != null ? (
              <Button
                aria-label="send"
                color="success"
                type="submit"
                auto
                shadow
                onClick={uploadToServer}
              >
                Send
              </Button>
            ) : (
              <Button aria-label="send" disabled auto shadow>
                Send
              </Button>
            )}
          </Row>
          {/* TODO: Loading button */}
          {/* ):( */}
          {/* <Button aria-label="send" disabled auto bordered color="warning" css={{ px: "$13" }}>
          <Loading type="points-opacity" color="currentColor" size="sm" />
        </Button> */}
          {/* )} */}
          <Spacer y={2.5} />
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
