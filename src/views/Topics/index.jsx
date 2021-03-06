import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopicsRequest } from '../../store/actions';
import { Row } from 'react-bootstrap';
import Topic from '../../components/Topics/Topic';
import NewTopic from '../../components/Topics/NewTopic';
import NewTopicModal from '../../components/Topics/NewTopicModal';
import Loader from "../../components/UI/Loader";

function Topics() {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.topics && state.topics.topics);
  
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  function handleModal(status = true) {
    setOpenModal(status)
  }
  
  useEffect(() => {
    if (!topics?.length)
    setLoading(true);
    dispatch(getTopicsRequest()).finally(() => {
      setLoading(false);
    })
  }, [dispatch]);
  
  return (
    <div>
      <h1>Topics</h1>
      { loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <NewTopic openModal={handleModal} />
            { topics && topics.map(topic => (
              <Topic
                key={topic.id}
                item={topic}
              />
            )) }
          </Row>
          <NewTopicModal show={openModal} toggleModal={handleModal} />
        </>
      ) }
    </div>
  );
}

export default Topics;
