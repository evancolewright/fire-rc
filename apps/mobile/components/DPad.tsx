import React, { useRef, ReactElement } from 'react';
import { TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useRemote } from '../RemoteContext'; // Import the useRemote hook
import { Commands } from 'shared';

const { width } = Dimensions.get('window');
const circleDiameter = width * 0.82;
const iconSize = circleDiameter / 3;

const ANIMATION_CONFIG = {
  duration: 100,
  useNativeDriver: true,
};

const OuterCircle = styled.View`
  width: ${circleDiameter}px;
  height: ${circleDiameter}px;
  border-radius: ${circleDiameter / 2}px;
  background-color: #3c4043;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${iconSize}px;
`;

const CenterCircle = styled(Animated.View)`
  width: ${iconSize * 1.1}px;
  height: ${iconSize * 1.1}px;
  border-radius: ${(iconSize * 1.1) / 2}px;
  background-color: #5f6368;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.View`
  width: ${iconSize * 0.9}px;
  height: ${iconSize * 0.9}px;
  border-radius: ${(iconSize * 0.9) / 2}px;
  background-color: #5f6368;
`;

const animatePress = (animatedValue: Animated.Value, toValue: number) => {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue,
      ...ANIMATION_CONFIG,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      ...ANIMATION_CONFIG,
    }),
  ]).start();
};

interface ArrowButtonProps {
  direction: Commands;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
}): ReactElement => {
  const { sendCommand } = useRemote(); // Use the useRemote hook to access sendCommand
  const arrowRef = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    animatePress(arrowRef, 0.9);
    sendCommand({ command: direction }); // Send the direction as the command
  };

  const getArrowConfig = (dir: Commands) => {
    switch (dir) {
      case Commands.RIGHT:
        return { name: 'chevron-right', rotate: '0deg' };
      case Commands.LEFT:
        return { name: 'chevron-left', rotate: '0deg' };
      case Commands.UP:
        return { name: 'chevron-left', rotate: '90deg' };
      case Commands.DOWN:
        return { name: 'chevron-left', rotate: '-90deg' };
      default:
        return { name: 'chevron-left', rotate: '0deg' };
    }
  };

  const { name: arrowName, rotate: arrowRotate } = getArrowConfig(direction);

  const rotateStyle = { transform: [{ rotate: arrowRotate }] };

  return (
    <Animated.View style={{ transform: [{ scale: arrowRef }] }}>
      <TouchableOpacity onPress={handlePress}>
        <MaterialIcons
          name={arrowName}
          size={iconSize}
          color='#5F6368'
          style={rotateStyle}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const Dpad: React.FC = (): ReactElement => {
  const centerRef = useRef(new Animated.Value(1)).current;

  const { sendCommand } = useRemote();

  const handleCenterPress = () => {
    animatePress(centerRef, 1.15);
    sendCommand({ command: Commands.SELECT });
  };

  return (
    <OuterCircle>
      <ArrowButton direction={Commands.UP} />
      <Row>
        <ArrowButton direction={Commands.LEFT} />
        <CenterCircle style={{ transform: [{ scale: centerRef }] }}>
          <TouchableOpacity onPress={handleCenterPress}>
            <InnerCircle />
          </TouchableOpacity>
        </CenterCircle>
        <ArrowButton direction={Commands.RIGHT} />
      </Row>
      <ArrowButton direction={Commands.DOWN} />
    </OuterCircle>
  );
};

export default Dpad;
