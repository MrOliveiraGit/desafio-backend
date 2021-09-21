import { User } from '@models/Reserva'

test('it should be ok', () => {
  const user = new User()

  user.name = 'Oliveira'

  expect(user.name).toEqual('Oliveira')
})
