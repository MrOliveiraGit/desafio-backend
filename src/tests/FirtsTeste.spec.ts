import app from '@config/App'
import Request from 'supertest'

test('it should be return reservas', async () => {
  const res = await Request(app).get('/reserva')
  expect(res.statusCode).toEqual(200)
  expect(res.body).toHaveProperty('reservas')
})

test('it should be create a reserva', async () => {
  const res = await Request(app).post('/reserva/create').send({
    dadosApartamento: {
      nomeApartamento: 'Céu rosa'
    },
    dataCheckin: '2021-08-02T00:00:00.000Z',
    dataCheckOut: '2021-09-02T00:00:00.000Z',
    qtdHospedes: 2,
    dadosHospedes: [
      {
        nomeHospedes: [
          'Oliveira',
          'Teixeira'
        ],
        emailHospedes: [
          'oliveira@',
          'teixeria@'
        ]
      }
    ]
  })
  expect(res.statusCode).toEqual(200)
  expect(res.body).toHaveProperty('reservaFeita')
})

test('it should be create a data conflict', async () => {
  const res = await Request(app).post('/reserva/create').send({
    dadosApartamento: {
      nomeApartamento: 'Céu rosa',
      id: '6150d1c70203bf71f89ecb3d'
    },
    dataCheckin: '2021-08-02T00:00:00.000Z',
    dataCheckOut: '2021-09-02T00:00:00.000Z',
    qtdHospedes: 2,
    dadosHospedes: [
      {
        nomeHospedes: [
          'Oliveira',
          'Teixeira'
        ],
        emailHospedes: [
          'oliveira@',
          'teixeria@'
        ]
      }
    ]
  })
  expect(res.statusCode).toEqual(200)
  expect(res.body).toHaveProperty('error')
})
