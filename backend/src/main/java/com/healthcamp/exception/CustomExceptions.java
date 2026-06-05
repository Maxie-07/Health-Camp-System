package com.healthcamp.exception;

public final class CustomExceptions {

    private CustomExceptions() {
    }

    public static ResourceNotFoundException notFound(String resource, Object id) {
        return new ResourceNotFoundException(resource + " not found: " + id);
    }

    public static BadRequestException badRequest(String message) {
        return new BadRequestException(message);
    }
}
