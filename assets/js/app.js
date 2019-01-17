var model = {
  swaps: [
    {
      status: 'success',
      bob: {
        asset: 'BTC',
        value: '0.00002005',
        fee: '0.0000012', // btc funding + btc withdrawal
        from: {
          address: '14xdPidvcTWhNEF4uNpYtdQFALALNdDVWD', //'buyer-bitcoin-address',
          rating: 5
        },
        to: {
          address: '0xA6279eF0c0C4BEa836E7e22AcC445f74BEa33CbD',
          rating: 5
        }
      },
      alice: {
        asset: 'ETH',
        value: '0.0001',
        fee: '0.000012', // eth funding + eth withdrawal
        from: {
          address: '0x0e41aBE19B107EF1dC5639795d090012B5f1896C',
          rating: 5
        },
        to: {
          address: 'mgFTQe1JvBQhr4PWZE6ucTPiQmqNN8GELF',
          rating: 5
        }
      },
      transactions: {
        withdrawTx: '0xb55107996afd0565699483e19db80996473474e2aa75'
      }
    }
  ]
}

var app = {
  init: function() {
    historyView.init()

    this.updateSwaps()
  },

  updateSwaps: function() {
    $.getJSON('https://seven.swap.online/swaps-testnet/state/ethbtc', function(data) {
      model.swaps = data.map((item) => {
	item.alice.value = item.alice.value / 10**18
        item.bob.value = item.bob.value / 10**8
        item.bob.fee = item.bob.fee / 10**8
        return item
      })

      historyView.init()
    })
  },

  getSwaps: function() {
    return model.swaps
  }
}

var historyView = {
  init: function() {
    this.historyElem = $('.history-list')

    this.template = $.templates('#history-list-item')

    this.render()
  },

  render: function() {
    var swaps = app.getSwaps()

    const html = this.template.render(swaps)

    this.historyElem.html(html)
  }
}

app.init()
