
export default function SetDummy(dummy, positions, scales, index)
{
    dummy.position.set(positions[index], positions[index + 1], positions[index + 2]);
    dummy.scale.set(scales[index], scales[index + 1], scales[index + 2]);
    dummy.updateMatrix();
    return dummy;
}

export function SetDummySimple(dummy, positions, index)
{
    dummy.position.set(positions[index], positions[index + 1], positions[index + 2]);
    dummy.updateMatrix();
    return dummy;
}

export function SetDummy2(dummy, positions, scales, rotations, index)
{
    dummy.position.set(positions[index], positions[index + 1], positions[index + 2]);
    dummy.scale.set(scales[index], scales[index + 1], scales[index + 2]);
    dummy.rotation.set(rotations[0], rotations[1], rotations[2]);
    dummy.updateMatrix();
    return dummy;
}

export function SetDummy3(dummy, positions, scales, rotations, index)
{
    dummy.position.set(positions[index], positions[index + 1], positions[index + 2]);
    dummy.scale.set(scales[0], scales[1], scales[2]);
    dummy.rotation.set(rotations[0], rotations[1], rotations[2]);
    dummy.updateMatrix();
    return dummy;
}