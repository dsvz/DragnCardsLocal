import React from "react";
import styled from "@emotion/styled";
import { borderRadius, grid } from "./Constants";
import { Card } from "./Card"

const getBorderColor = (isDragging) =>
  isDragging ? "black" : "transparent";

const imageSize = 40;

const Container = styled.div`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px orange` : "none"};
  box-sizing: border-box;
  padding: ${grid}px;
  width: ${4.5}vw;
  height: ${4.5/0.7}vw;
  min-width: ${4.5}vw;
  min-height:  ${4.5/0.7}vw;
  margin-right: ${grid}px;
  user-select: none;
  position: relative;

  /* anchor overrides */
  color: "yellow";

  &:hover,
  &:active {
    color: "gray";
    text-decoration: none;
  }

`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style
  };
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function Stack(props) {
  const {
    broadcast,
    group,
    stackIndex,
    stack,
    isDragging,
    isGroupedOver,
    provided,
    style,
    isClone,
    index,
    activeCard,
    setActiveCard,
  } = props;

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={stack.id}
      data-index={index}
    >
      {stack.cards.map((card, cardIndex) => {
          return(
            <Card 
              broadcast={broadcast} 
              group={group} 
              stackIndex={stackIndex}
              cardIndex={cardIndex}
              inputCard={card} 
              key={card.id} 
              activeCard={activeCard} 
              setActiveCard={setActiveCard}
            >
            </Card>)
      })}
    </Container>
  );
}

export default Stack;
