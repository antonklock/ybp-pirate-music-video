export function getNameTextureLabel(input: string) {
    let regex = /([A-Za-z0-9]+(\.[A-Za-z0-9]+)+)$/;
    return regex.test(input);
}