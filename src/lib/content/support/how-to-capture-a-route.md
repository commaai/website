---
title: How to capture a route
description: Record an issue and share the drive with comma support.
order: 5
listed: false
---

## What is a route?

A route is a recording of one drive. Your comma device starts a route when you turn the car on and ends it when you turn the car off.

## Record the issue

1. Install the latest stock openpilot release. Support cannot troubleshoot routes recorded while using a fork or other third party software.
2. Drive until the issue happens. Only reproduce an issue when it is safe to do so, and do not interact with the device while driving.
3. Note the approximate time the issue happened. If your device shows the bookmark control, use it when the issue occurs so the moment is easier to find later.
4. Park safely and turn the car off to finish the route.

## Upload the route

Connect the comma device to Wi-Fi after the drive and leave it powered on so the route can upload. Upload time depends on the connection and the length of the drive.

## Share the route

1. Sign in to [comma connect](https://connect.comma.ai/) with the account paired to your device.
2. Open the drive from the correct date and time.
3. Copy the route link from your browser.
4. Include the link, the approximate time of the issue, and a short description of what happened in your support ticket.

## Why is a stock route needed for a hardware support ticket?

It is our policy for a comma engineer to root cause every hardware issue, for both our understanding of any hardware failures and to provide you with the best experience. A route on the latest stock openpilot is necessary before a ticket is sent to an engineer for review. Any ticket with a route from third party software will be closed with a request for a new ticket with a stock route.

We cannot review logs from third party software for several reasons, including:
- your issue may be directly caused by the third party software
- the third party software may not be up to date with the latest openpilot
- the third party software lacks the necessary logging for an engineer to review the issue